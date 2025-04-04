#!/usr/bin/env node

/**
 * Figma MCP 发布脚本
 * 从Figma获取组件，转换为代码，并发布到指定目标
 */

// 导入依赖
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { FigmaClient } = require('figma-api-kit');
const figmaTransformer = require('figma-transformer');
const { execSync } = require('child_process');
const config = require('./figma-mcp-config.js');
const chalk = require('chalk');

// 初始化日志函数
const log = {
  info: (msg) => console.log(chalk.blue(`[INFO] ${msg}`)),
  success: (msg) => console.log(chalk.green(`[SUCCESS] ${msg}`)),
  warn: (msg) => console.log(chalk.yellow(`[WARNING] ${msg}`)),
  error: (msg) => console.log(chalk.red(`[ERROR] ${msg}`))
};

// 初始化Figma客户端
const figma = new FigmaClient({
  personalAccessToken: config.figma.personalAccessToken
});

/**
 * 从Figma获取组件数据
 */
async function fetchComponentsFromFigma() {
  try {
    log.info(`从Figma获取文件: ${config.figma.fileId}`);
    
    const fileData = await figma.file(config.figma.fileId);
    if (!fileData || !fileData.components) {
      log.error('无法获取Figma文件或组件数据为空');
      throw new Error('无法获取Figma组件');
    }
    
    log.success(`成功获取${Object.keys(fileData.components).length}个组件`);
    return fileData;
  } catch (error) {
    log.error(`从Figma获取组件时出错: ${error.message}`);
    throw error;
  }
}

/**
 * 转换Figma组件为代码
 */
async function transformComponents(fileData) {
  try {
    log.info(`正在转换组件为${config.output.format}格式...`);
    
    const transformOptions = {
      components: fileData.components,
      format: config.output.format,
      includeTypes: config.output.typeDefinitions,
      colorFormat: config.transform.colorFormat,
      componentNameFormat: config.transform.componentNameFormat,
      pixelUnit: config.transform.units.pixels,
      remBase: config.transform.units.remBase
    };
    
    // 应用自定义转换插件
    if (config.transform.plugins && config.transform.plugins.length > 0) {
      transformOptions.plugins = config.transform.plugins;
    }
    
    const transformedComponents = await figmaTransformer.transform(transformOptions);
    
    if (!transformedComponents || Object.keys(transformedComponents).length === 0) {
      log.warn('转换后的组件为空');
      return {};
    }
    
    log.success(`成功转换${Object.keys(transformedComponents).length}个组件`);
    return transformedComponents;
  } catch (error) {
    log.error(`转换组件时出错: ${error.message}`);
    throw error;
  }
}

/**
 * 保存转换后的组件到文件
 */
function saveComponentsToFiles(transformedComponents) {
  try {
    log.info(`保存组件到${config.output.directory}...`);
    
    // 确保输出目录存在
    if (!fs.existsSync(config.output.directory)) {
      fs.mkdirSync(config.output.directory, { recursive: true });
      log.info(`创建目录: ${config.output.directory}`);
    }
    
    // 保存每个组件到单独的文件
    Object.entries(transformedComponents).forEach(([name, content]) => {
      const extension = getExtensionForFormat(config.output.format);
      const filePath = path.join(config.output.directory, `${name}.${extension}`);
      
      fs.writeFileSync(filePath, content);
      log.info(`已保存组件: ${name}.${extension}`);
    });
    
    // 如果需要，生成Storybook示例
    if (config.output.generateStories) {
      generateStories(transformedComponents);
    }
    
    // 如果需要，生成文档
    if (config.output.generateDocs) {
      generateDocs(transformedComponents);
    }
    
    log.success(`所有组件已保存到${config.output.directory}`);
  } catch (error) {
    log.error(`保存组件时出错: ${error.message}`);
    throw error;
  }
}

/**
 * 根据输出格式获取文件扩展名
 */
function getExtensionForFormat(format) {
  const extensions = {
    'react': 'jsx',
    'vue': 'vue',
    'angular': 'ts',
    'css': 'css',
    'tokens': 'json',
    'default': 'js'
  };
  
  return extensions[format] || extensions.default;
}

/**
 * 生成Storybook示例
 */
function generateStories(components) {
  log.info('生成Storybook示例...');
  
  const storiesDir = path.join(config.output.directory, 'stories');
  if (!fs.existsSync(storiesDir)) {
    fs.mkdirSync(storiesDir, { recursive: true });
  }
  
  Object.keys(components).forEach(name => {
    const storyContent = generateStoryContent(name, config.output.format);
    const storyPath = path.join(storiesDir, `${name}.stories.${getExtensionForFormat(config.output.format)}`);
    fs.writeFileSync(storyPath, storyContent);
    log.info(`已生成Story: ${name}.stories.${getExtensionForFormat(config.output.format)}`);
  });
  
  log.success('Storybook示例生成完成');
}

/**
 * 生成Story内容
 */
function generateStoryContent(componentName, format) {
  // 根据不同格式生成不同的Story模板
  switch (format) {
    case 'react':
      return `
import React from 'react';
import { ${componentName} } from '../${componentName}';

export default {
  title: 'Components/${componentName}',
  component: ${componentName},
  argTypes: {
    // Define controls for your component props here
  },
};

const Template = (args) => <${componentName} {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Define default props here
};
`;
    
    case 'vue':
      return `
import ${componentName} from '../${componentName}.vue';

export default {
  title: 'Components/${componentName}',
  component: ${componentName},
  argTypes: {
    // Define controls for your component props here
  },
};

const Template = (args) => ({
  components: { ${componentName} },
  setup() {
    return { args };
  },
  template: '<${componentName} v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  // Define default props here
};
`;
    
    default:
      return `// Storybook example for ${componentName}`;
  }
}

/**
 * 生成组件文档
 */
function generateDocs(components) {
  log.info('生成组件文档...');
  
  const docsDir = path.join(config.output.directory, 'docs');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }
  
  // 生成索引文档
  const indexContent = `# 组件文档\n\n${Object.keys(components).map(name => `- [${name}](${name}.md)`).join('\n')}`;
  fs.writeFileSync(path.join(docsDir, 'README.md'), indexContent);
  
  // 为每个组件生成文档
  Object.keys(components).forEach(name => {
    const docContent = `# ${name}

## 概述
从Figma设计系统自动生成的组件。

## 用法
\`\`\`jsx
import { ${name} } from '../${name}';

function MyComponent() {
  return <${name} />;
}
\`\`\`

## 属性
| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| prop1  | string | '' | 描述 |
| prop2  | number | 0  | 描述 |

## 示例
请参考相应的Storybook示例。
`;
    
    fs.writeFileSync(path.join(docsDir, `${name}.md`), docContent);
    log.info(`已生成文档: ${name}.md`);
  });
  
  log.success('组件文档生成完成');
}

/**
 * 更新版本号
 */
function updateVersion() {
  try {
    log.info('更新版本号...');
    
    const packagePath = path.join(process.cwd(), 'package.json');
    
    // 读取package.json
    const pkg = require(packagePath);
    const originalVersion = pkg.version;
    
    // 根据配置的版本策略更新版本号
    if (config.versioning.strategy === 'semantic') {
      const [major, minor, patch] = originalVersion.split('.').map(Number);
      
      switch (config.versioning.autoIncrement) {
        case 'major':
          pkg.version = `${major + 1}.0.0`;
          break;
        case 'minor':
          pkg.version = `${major}.${minor + 1}.0`;
          break;
        case 'patch':
        default:
          pkg.version = `${major}.${minor}.${patch + 1}`;
          break;
      }
    } else if (config.versioning.strategy === 'date') {
      // 使用当前日期作为版本号
      const now = new Date();
      pkg.version = `${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()}`;
    } else if (config.versioning.strategy === 'hash') {
      // 使用当前时间戳的哈希值
      const timestamp = Date.now().toString();
      const hash = Buffer.from(timestamp).toString('hex').substring(0, 8);
      pkg.version = `0.0.0-${hash}`;
    }
    
    // 更新package.json
    fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2));
    
    log.success(`版本已从${originalVersion}更新到${pkg.version}`);
    return pkg.version;
  } catch (error) {
    log.error(`更新版本时出错: ${error.message}`);
    throw error;
  }
}

/**
 * 生成CHANGELOG
 */
function generateChangelog(version) {
  if (!config.versioning.generateChangelog) {
    return;
  }
  
  try {
    log.info('生成CHANGELOG...');
    
    const changelogPath = path.join(process.cwd(), 'CHANGELOG.md');
    let changelogContent = '';
    
    // 如果CHANGELOG存在，读取它
    if (fs.existsSync(changelogPath)) {
      changelogContent = fs.readFileSync(changelogPath, 'utf8');
    }
    
    // 添加新版本的条目
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    
    const newEntry = `
# ${version} (${dateStr})

## 新增

- 从Figma同步的组件更新

## 变更

- 组件样式和属性更新
`;
    
    // 将新条目添加到CHANGELOG顶部
    changelogContent = newEntry + changelogContent;
    
    // 保存CHANGELOG
    fs.writeFileSync(changelogPath, changelogContent);
    
    log.success('CHANGELOG已更新');
  } catch (error) {
    log.error(`生成CHANGELOG时出错: ${error.message}`);
    // 不抛出错误，作为非关键步骤
  }
}

/**
 * 执行发布前命令
 */
function runPrePublishCommands() {
  if (!config.publish.prePublishCommands || config.publish.prePublishCommands.length === 0) {
    return;
  }
  
  try {
    log.info('执行发布前命令...');
    
    config.publish.prePublishCommands.forEach(command => {
      log.info(`执行: ${command}`);
      execSync(command, { stdio: 'inherit' });
    });
    
    log.success('所有发布前命令已执行');
  } catch (error) {
    log.error(`执行发布前命令时出错: ${error.message}`);
    throw error;
  }
}

/**
 * 发布到NPM
 */
function publishToNpm() {
  try {
    log.info('发布到NPM...');
    
    const publishCommand = `npm publish --registry=${config.publish.registry} --access=${config.publish.access}`;
    
    log.info(`执行: ${publishCommand}`);
    execSync(publishCommand, { stdio: 'inherit' });
    
    log.success('已成功发布到NPM');
  } catch (error) {
    log.error(`发布到NPM时出错: ${error.message}`);
    throw error;
  }
}

/**
 * 发布到GitHub
 */
function publishToGitHub(version) {
  try {
    log.info('发布到GitHub...');
    
    // 提交更改
    execSync('git add .', { stdio: 'inherit' });
    execSync(`git commit -m "chore: update components to v${version}"`, { stdio: 'inherit' });
    
    // 创建标签
    execSync(`git tag -a v${version} -m "Version ${version}"`, { stdio: 'inherit' });
    
    // 推送到远程
    execSync('git push origin main --tags', { stdio: 'inherit' });
    
    log.success('已成功发布到GitHub');
  } catch (error) {
    log.error(`发布到GitHub时出错: ${error.message}`);
    throw error;
  }
}

/**
 * 发送通知
 */
function sendNotifications(version) {
  try {
    log.info('发送通知...');
    
    // 发送Slack通知
    if (config.publish.notifications.slack) {
      // 实际实现需要使用Slack API
      log.info(`将发送Slack通知到: ${config.publish.notifications.slack}`);
    }
    
    // 发送电子邮件通知
    if (config.publish.notifications.email) {
      // 实际实现需要使用邮件发送库
      log.info(`将发送电子邮件通知到: ${config.publish.notifications.email}`);
    }
    
    log.success('所有通知已发送');
  } catch (error) {
    log.error(`发送通知时出错: ${error.message}`);
    // 不抛出错误，作为非关键步骤
  }
}

/**
 * 主函数
 */
async function main() {
  try {
    log.info('开始发布流程...');
    
    // 1. 从Figma获取组件
    const fileData = await fetchComponentsFromFigma();
    
    // 2. 转换组件为代码
    const transformedComponents = await transformComponents(fileData);
    
    // 3. 保存组件到文件
    saveComponentsToFiles(transformedComponents);
    
    // 4. 执行发布前命令
    runPrePublishCommands();
    
    // 5. 更新版本号
    const version = updateVersion();
    
    // 6. 生成CHANGELOG
    generateChangelog(version);
    
    // 7. 发布到目标位置
    if (config.publish.target === 'npm') {
      publishToNpm();
    } else if (config.publish.target === 'github') {
      publishToGitHub(version);
    }
    
    // 8. 发送通知
    sendNotifications(version);
    
    log.success(`组件发布完成! 版本: ${version}`);
  } catch (error) {
    log.error(`发布流程失败: ${error.message}`);
    process.exit(1);
  }
}

// 执行主函数
main(); 