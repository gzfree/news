# 新闻应用原型

一个响应式移动端Web应用，包含新闻展示、视频通话滤镜、数据可视化和AI噪声消除等功能。

## 功能特点

- 新闻信息流与文章详情页
- 视频通话滤镜与背景特效
- 通话过程中的AI降噪功能
- Botim通讯应用界面模拟
- 搜索功能与搜索结果展示
- 数据可视化仪表盘

## 在线访问

本项目通过GitHub Actions自动部署到Vercel平台。

### 访问链接
- 生产环境: https://news-kappa-henna.vercel.app/

### 快速访问链接
- 新闻页面: https://news-kappa-henna.vercel.app/news.html
- 视频滤镜: https://news-kappa-henna.vercel.app/temp/video-filters.html
- 搜索页面: https://news-kappa-henna.vercel.app/temp/search.html
- Botim主页: https://news-kappa-henna.vercel.app/temp/index.html
- 降噪通话: https://news-kappa-henna.vercel.app/temp/noise-cancellation-en.html

## 项目结构

```
├── interactive-prototype/     # 交互原型目录
│   ├── index.html             # Botim通讯应用主页
│   ├── news.html              # 新闻应用主页
│   ├── noise-cancellation-en.html  # 英文版AI降噪通话页面
│   ├── noise-simplified.html  # 简化版AI降噪通话页面
│   ├── search.html            # 搜索页面
│   ├── search-result.html     # 搜索结果页面
│   └── video-filters.html     # 视频滤镜页面
│
├── data-analysis/             # 数据分析与可视化组件
│   ├── d-income-comparison.html  # 收入对比仪表盘
│   └── d-voip.html            # VoIP通讯数据仪表盘
│
├── requirements/              # 需求文档
│   └── PRD_Template.md        # 产品需求文档模板
│
├── news-react/                # React版本(开发中)
│
└── .github/                   # GitHub工作流配置
    └── workflows/deploy.yml   # 自动部署工作流配置
```

## 技术实现

- 使用纯HTML、CSS和JavaScript实现，无需构建步骤
- 使用CSS Flexbox和Grid实现响应式布局
- 使用CSS动画和过渡效果增强用户体验
- JavaScript实现交互功能和页面跳转
- 使用localStorage实现简单的状态持久化

## 主要功能流程

1. 从Botim主页(index.html)点击联系人的电话图标
2. 跳转到AI降噪通话页面(noise-cancellation-en.html)
3. 可以点击右侧视频窗口进入视频滤镜页面(video-filters.html)
4. 通过左侧导航菜单或底部控制栏进行操作
5. 点击返回按钮或挂断按钮回到主页

## 本地开发

无需安装任何依赖，直接在浏览器中打开HTML文件即可。

## GitHub自动部署

### 设置说明

1. 在GitHub仓库中创建Vercel密钥:
   - 进入Settings > Secrets and Variables > Actions
   - 添加以下仓库密钥:
     - `VERCEL_TOKEN`: Vercel API令牌
     - `VERCEL_PROJECT_ID`: Vercel项目ID
     - `VERCEL_ORG_ID`: Vercel组织ID

2. 向main分支推送更改会触发自动部署

3. 在GitHub仓库的Actions标签页查看部署状态

### 手动部署

如有需要，可以在GitHub的Actions标签页手动触发部署。
