// 全局导航组件
// 这个文件用于在所有HTML页面中引入统一的导航栏

document.addEventListener('DOMContentLoaded', function() {
  // 检测当前页面路径，用于设置活动状态
  const currentPath = window.location.pathname;
  let activeSection = 'prototype'; // 默认为原型部分

  // 根据路径确定当前激活的部分
  if (currentPath.includes('dashboard') || currentPath.includes('income-comparison') || currentPath.includes('voip')) {
    activeSection = 'analytics';
  } else if (currentPath.includes('docs')) {
    activeSection = 'docs';
  }

  // 构建导航HTML
  const navHTML = `
    <div class="global-nav">
      <a href="dashboard.html" class="global-nav-item ${activeSection === 'analytics' ? 'active' : ''}">A <span class="nav-arrow">▾</span>
        <div class="submenu">
          <a href="dashboard.html" class="submenu-item">Dashboard</a>
          <a href="dashboard.html#income" class="submenu-item">Income Comparison</a>
          <a href="dashboard.html#voip" class="submenu-item">VOIP Metrics</a>
        </div>
      </a>
      <a href="index.html" class="global-nav-item ${activeSection === 'prototype' ? 'active' : ''}">P <span class="nav-arrow">▾</span>
        <div class="submenu">
          <a href="index.html" class="submenu-item">Home</a>
          <a href="news.html" class="submenu-item">News</a>
          <a href="search.html" class="submenu-item">Search</a>
          <a href="noise-cancellation-en.html" class="submenu-item">Call</a>
          <a href="video-filters.html" class="submenu-item">Filters</a>
        </div>
      </a>
      <a href="docs.html" class="global-nav-item ${activeSection === 'docs' ? 'active' : ''}">D <span class="nav-arrow">▾</span>
        <div class="submenu">
          <a href="docs.html" class="submenu-item">Requirements</a>
          <a href="docs.html#api" class="submenu-item">API Docs</a>
          <a href="docs.html#design" class="submenu-item">Design System</a>
        </div>
      </a>
    </div>
  `;

  // 查找导航占位符并替换
  const navPlaceholders = document.querySelectorAll('.global-nav');
  if (navPlaceholders.length > 0) {
    // 替换现有的导航元素
    navPlaceholders.forEach(placeholder => {
      placeholder.outerHTML = navHTML;
    });
  } else {
    // 如果没有占位符，在body的开头添加导航
    const appContainer = document.querySelector('.app-container');
    if (appContainer) {
      appContainer.insertAdjacentHTML('beforebegin', navHTML);
    }
  }
}); 