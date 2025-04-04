# Figma MCP (Managed Component Publishing) 设置指南

本文档将指导您如何设置和配置Figma MCP，以实现设计组件的版本控制和自动发布。

## 前提条件

- Figma Organization 或 Professional 账户
- 已组织良好的设计系统组件库
- GitHub 账户(用于代码集成)
- Node.js 环境(用于脚本和工具)

## 步骤1: 准备设计系统文件

1. 在Figma中组织您的组件库：
   - 创建一个专门的"Design System"文件
   - 使用一致的命名约定(如 `Button/Primary`, `Icon/Home`)
   - 为所有组件添加适当的描述和属性

2. 设置组件变体和属性:
   - 利用组件变体(Variants)管理不同状态
   - 使用属性(Properties)定义可定制选项
   - 确保命名一致性，便于自动化处理

## 步骤2: 设置发布工作流

1. 在GitHub上创建一个专门的仓库用于设计系统:
```bash
# 克隆仓库
git clone https://github.com/your-org/design-system.git
cd design-system

# 初始化项目
npm init -y
```

2. 安装必要的依赖:
```bash
npm install --save-dev @figma/api @figma/plugin-typings figma-api-kit figma-transformer
```

3. 创建配置文件 `figma-mcp-config.js`:
```javascript
module.exports = {
  figma: {
    personalAccessToken: process.env.FIGMA_ACCESS_TOKEN,
    fileId: 'YOUR_FIGMA_FILE_ID',
    nodeIds: ['COMPONENT_SET_NODE_ID_1', 'COMPONENT_SET_NODE_ID_2']
  },
  output: {
    format: 'react', // 可选: react, vue, angular, css, tokens
    directory: './src/components',
    typeDefinitions: true
  },
  versioning: {
    strategy: 'semantic', // semantic, date, hash
    autoIncrement: 'patch' // major, minor, patch
  },
  publish: {
    target: 'npm', // npm, github
    registry: 'https://registry.npmjs.org/',
    access: 'public'
  }
};
```

## 步骤3: 创建Figma访问令牌

1. 在Figma中，前往账户设置 > 个人访问令牌
2. 创建一个新令牌，给它一个描述性名称如 "Design System MCP"
3. 复制生成的令牌，并将其安全保存在环境变量中:
```bash
# 在开发环境中
export FIGMA_ACCESS_TOKEN=your_token_here

# 或添加到项目的.env文件中(记得将.env添加到.gitignore)
echo "FIGMA_ACCESS_TOKEN=your_token_here" > .env
```

## 步骤4: 创建发布脚本

创建一个 `publish.js` 脚本文件:

```javascript
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { FigmaClient } = require('figma-api-kit');
const figmaTransformer = require('figma-transformer');
const config = require('./figma-mcp-config.js');

// 初始化Figma客户端
const figma = new FigmaClient({
  personalAccessToken: config.figma.personalAccessToken
});

async function publishComponents() {
  try {
    // 从Figma获取组件
    console.log('从Figma获取组件...');
    const fileData = await figma.file(config.figma.fileId);
    
    // 转换Figma组件
    console.log('转换组件为代码...');
    const transformedComponents = await figmaTransformer.transform({
      components: fileData.components,
      format: config.output.format,
      includeTypes: config.versioning.typeDefinitions
    });
    
    // 保存组件代码
    console.log('保存组件到目标目录...');
    if (!fs.existsSync(config.output.directory)){
      fs.mkdirSync(config.output.directory, { recursive: true });
    }
    
    Object.entries(transformedComponents).forEach(([name, content]) => {
      const filePath = path.join(config.output.directory, `${name}.${getExtension()}`);
      fs.writeFileSync(filePath, content);
      console.log(`已写入: ${filePath}`);
    });
    
    // 更新版本
    console.log('更新版本...');
    updateVersion();
    
    // 发布(如果需要)
    if (config.publish.target === 'npm') {
      console.log('发布到NPM...');
      // 执行NPM发布命令
    }
    
    console.log('发布完成!');
  } catch (error) {
    console.error('发布失败:', error);
  }
}

function getExtension() {
  switch(config.output.format) {
    case 'react': return 'jsx';
    case 'vue': return 'vue';
    case 'angular': return 'ts';
    case 'css': return 'css';
    case 'tokens': return 'json';
    default: return 'js';
  }
}

function updateVersion() {
  const packagePath = path.join(process.cwd(), 'package.json');
  const pkg = require(packagePath);
  
  if (config.versioning.strategy === 'semantic') {
    const [major, minor, patch] = pkg.version.split('.').map(Number);
    
    switch (config.versioning.autoIncrement) {
      case 'major':
        pkg.version = `${major + 1}.0.0`;
        break;
      case 'minor':
        pkg.version = `${major}.${minor + 1}.0`;
        break;
      case 'patch':
        pkg.version = `${major}.${minor}.${patch + 1}`;
        break;
    }
  }
  
  fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2));
  console.log(`版本已更新到: ${pkg.version}`);
}

// 执行发布
publishComponents();
```

## 步骤5: 设置GitHub Actions自动化

创建 `.github/workflows/publish-components.yml` 文件:

```yaml
name: Publish Design System Components

on:
  # 手动触发
  workflow_dispatch:
  # 计划触发 (每周一发布)
  schedule:
    - cron: '0 9 * * 1'
  # 当设计文件有更新时触发(需额外webhook设置)

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
          registry-url: 'https://registry.npmjs.org/'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Publish components
        run: node publish.js
        env:
          FIGMA_ACCESS_TOKEN: ${{ secrets.FIGMA_ACCESS_TOKEN }}
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## 步骤6: 集成到开发工作流

1. 为您的团队创建简单的组件使用文档:
```bash
# 安装文档生成工具
npm install --save-dev storybook

# 初始化Storybook
npx sb init
```

2. 为发布的组件创建示例和文档

3. 配置自动同步变更

## 步骤7: 监控和管理

1. 创建脚本以监控组件使用情况

2. 设置通知机制：
```javascript
// 添加到publish.js中
function sendNotification(version) {
  // 这里可以集成Slack, Teams, Email等通知
  console.log(`已发送新版本 ${version} 通知`);
}
```

3. 维护发布日志文档

## 最佳实践

1. **建立明确的版本控制策略**
   - 主版本(1.x.x): 重大修改，可能破坏兼容性
   - 次版本(x.1.x): 新功能，保持向后兼容
   - 补丁版本(x.x.1): 错误修复和小改进

2. **创建组件变更文档模板**
   - 变更描述
   - 变更原因
   - 受影响的组件
   - 迁移指南(如适用)

3. **定期进行一致性审计**
   - 检查组件在产品中的使用情况
   - 找出未使用或过时的组件
   - 确保新组件符合设计系统规范

## 故障排除

1. **访问令牌问题**
   - 确保令牌具有必要的访问权限
   - 检查令牌是否过期

2. **文件ID和节点ID问题**
   - 确保使用正确的Figma文件ID
   - 验证组件节点ID是否有效

3. **发布失败**
   - 检查网络连接
   - 验证发布权限
   - 查看详细日志进行调试 