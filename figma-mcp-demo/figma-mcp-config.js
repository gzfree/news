/**
 * Figma MCP 配置文件
 * 定义Figma组件到代码的转换及发布选项
 */

module.exports = {
  // Figma API配置
  figma: {
    // Figma访问令牌 - 通过环境变量设置，不要硬编码
    personalAccessToken: process.env.FIGMA_ACCESS_TOKEN,
    
    // Figma文件ID - 可以从Figma文件URL中获取
    // 例如：https://www.figma.com/file/ABCDEFG12345/Design-System
    fileId: process.env.FIGMA_FILE_ID || 'YOUR_FIGMA_FILE_ID',
    
    // 组件节点ID列表 - 可选，如果不提供则获取所有组件
    nodeIds: process.env.FIGMA_NODE_IDS ? process.env.FIGMA_NODE_IDS.split(',') : [],
    
    // 是否包含组件描述
    includeDescription: true
  },
  
  // 输出配置
  output: {
    // 输出格式：react, vue, angular, css, tokens
    format: process.env.OUTPUT_FORMAT || 'react',
    
    // 输出目录
    directory: './src/components',
    
    // 是否生成类型定义
    typeDefinitions: true,
    
    // 组件模板文件位置
    templates: {
      // 格式特定的模板
      react: './src/templates/react.template.jsx',
      vue: './src/templates/vue.template.vue',
      css: './src/templates/css.template.css'
    },
    
    // 是否生成Storybook示例
    generateStories: true,
    
    // 是否生成文档
    generateDocs: true
  },
  
  // 版本控制配置
  versioning: {
    // 版本策略：semantic(语义化), date(日期), hash(哈希)
    strategy: 'semantic',
    
    // 自动递增版本号：major, minor, patch
    autoIncrement: 'patch',
    
    // 是否生成CHANGELOG
    generateChangelog: true,
    
    // 变更检测阈值 - 低于此值的变化视为小改动
    changeThreshold: 0.1
  },
  
  // 发布配置
  publish: {
    // 发布目标：npm, github
    target: process.env.PUBLISH_TARGET || 'npm',
    
    // NPM注册表URL
    registry: process.env.NPM_REGISTRY || 'https://registry.npmjs.org/',
    
    // 发布访问级别：public, restricted
    access: 'public',
    
    // 发布前的命令
    prePublishCommands: [
      'npm run lint',
      'npm run test'
    ],
    
    // 发布后的通知配置
    notifications: {
      slack: process.env.SLACK_WEBHOOK_URL,
      email: process.env.NOTIFICATION_EMAIL
    }
  },
  
  // 转换选项
  transform: {
    // 组件命名格式
    // %NAME% - 原始名称
    // %CATEGORY% - 类别(从Figma路径中提取)
    componentNameFormat: '%CATEGORY%%NAME%',
    
    // 颜色格式：hex, rgba, hsla
    colorFormat: 'rgba',
    
    // 文本转换为：文本、图标或按原样导出
    textHandling: 'as-is',
    
    // 单位转换
    units: {
      pixels: 'rem', // 从px到rem的转换
      remBase: 16,    // 1rem = 16px
    },
    
    // 自定义插件转换器
    plugins: [
      // 示例: 添加自定义转换器
      // require('./plugins/custom-transformer')
    ]
  }
}; 