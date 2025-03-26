# Botim应用项目结构

本文档描述了Botim应用项目的整体结构和文件组织。项目被分为三个主要部分：交互原型、需求文档和数据分析。

## 目录结构

```
/
├── interactive-prototype/    # 交互原型和界面设计
│   ├── home.html            # 主界面，包含联系人列表和通话列表
│   ├── search.html          # 预搜索界面
│   ├── search-result.html   # 搜索结果界面
│   ├── news.html            # 新闻小程序，展示新闻列表
│   ├── news-app-html.html   # 新闻应用HTML版本
│   ├── news-detail.html     # 新闻详情页(如果存在)
│   ├── voip.html            # 视频通话页面
│   ├── video-filters.html   # 视频滤镜效果页面
│   ├── noise-cancellation-en.html # 噪音消除功能英文说明
│   ├── noise-simplified.html      # 噪音消除功能简化版本
│   └── index.html           # 主页面
│
├── requirements/            # 需求文档
│   ├── PRD_Template.md      # 产品需求文档模板
│   └── README.md            # 需求文档说明
│
└── data-analysis/          # 数据分析和可视化
    ├── d-income-comparison.html # 3.0到4.0版本的收入对比
    ├── d-voip.html          # VOIP能力的分析
    └── README.md            # 数据分析说明
```

## 模块说明

### 1. 交互原型 (interactive-prototype)

此目录包含应用的所有交互界面原型。这些HTML文件可以直接在浏览器中打开，展示应用的主要界面和功能流程。主要功能包括：

- 联系人和通话管理
- 搜索功能
- 新闻浏览和阅读
- 视频通话
- 视频滤镜和效果
- 噪音消除功能

### 2. 需求文档 (requirements)

此目录包含产品需求文档和规格说明。目前只有PRD模板，后续可能会添加以下内容：

- 用户需求分析
- 功能规格说明
- 交互设计规范
- API接口文档

### 3. 数据分析 (data-analysis)

此目录包含数据分析和可视化Dashboard，用于展示应用性能和用户行为数据，包括：

- 收入对比分析
- VOIP能力分析
- 用户行为数据
- 性能指标分析

## 使用方法

- **查看交互原型**：直接在浏览器中打开HTML文件即可
- **查看数据分析**：打开相应的Dashboard HTML文件
- **查看需求文档**：使用Markdown查看器或文本编辑器打开PRD文件 