# Figma MCP 演示项目

这是一个Figma Managed Component Publishing (MCP)演示项目，用于展示如何自动化设计系统组件的发布和维护。

## 项目概述

本演示项目展示了一个完整的工作流程，将Figma设计系统组件自动转换为代码组件并发布。

## 快速开始

1. 克隆此仓库:
```bash
git clone https://github.com/your-org/figma-mcp-demo.git
cd figma-mcp-demo
```

2. 安装依赖:
```bash
npm install
```

3. 配置环境变量:
```bash
cp .env.example .env
```
然后编辑`.env`文件，填入您的Figma访问令牌和其他必要信息。

4. 运行发布脚本:
```bash
npm run publish
```

## 文件结构

```
figma-mcp-demo/
├── .github/
│   └── workflows/           # GitHub Actions工作流配置
│       └── publish.yml      # 自动发布工作流
├── src/
│   ├── components/          # 生成的组件代码
│   └── templates/           # 组件模板
├── .env.example             # 环境变量示例文件
├── figma-mcp-config.js      # MCP配置文件
├── package.json             # 项目配置
├── publish.js               # 发布脚本
└── README.md                # 项目文档
```

## 使用指南

### 设置Figma文件

1. 在Figma中创建或使用现有的设计系统文件
2. 确保组件使用一致的命名约定
3. 在`figma-mcp-config.js`中更新文件ID和节点ID

### 发布流程

1. 更新Figma组件
2. 推送更改到GitHub仓库
3. GitHub Actions会自动触发发布流程
4. 在NPM或其他目标位置发布更新的组件

## 配置选项

详细的配置选项可在`figma-mcp-config.js`文件中查看和修改:

- **输出格式**: React, Vue, Angular, CSS或设计令牌
- **版本策略**: 语义化版本、日期或哈希值
- **发布目标**: NPM, GitHub Packages或自定义位置

## 疑难解答

如果在使用过程中遇到问题，请参考以下常见问题:

1. **访问令牌过期**: 重新生成Figma访问令牌
2. **组件转换失败**: 检查Figma组件结构和命名
3. **发布错误**: 验证发布权限和目标配置

## 贡献指南

我们欢迎社区贡献，请参阅[贡献指南](CONTRIBUTING.md)。

## 许可证

本项目基于MIT许可发布。详见[LICENSE](LICENSE)文件。 