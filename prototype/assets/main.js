// 当页面加载完成时初始化
document.addEventListener('DOMContentLoaded', function() {
  // 设置状态栏时间
  updateStatusBarTime();
  setInterval(updateStatusBarTime, 60000); // 每分钟更新一次
  
  // 添加底部导航栏点击事件
  setupTabBarNavigation();
  
  // 添加页面切换动画效果
  setupPageTransitions();
  
  // 初始化内容区域的滚动行为
  setupScrollBehavior();
});

// 更新状态栏时间
function updateStatusBarTime() {
  const timeElements = document.querySelectorAll('.status-time');
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const timeStr = `${hours}:${minutes}`;
  
  timeElements.forEach(el => {
    el.textContent = timeStr;
  });
}

// 设置底部标签栏导航
function setupTabBarNavigation() {
  const tabItems = document.querySelectorAll('.tab-item');
  
  tabItems.forEach(tab => {
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      
      // 移除所有tab的active类
      tabItems.forEach(t => t.classList.remove('active'));
      
      // 添加active类到当前点击的tab
      this.classList.add('active');
      
      // 获取目标页面id
      const targetPage = this.getAttribute('data-target');
      if (targetPage) {
        navigateToPage(targetPage);
      }
    });
  });
}

// 页面切换动画
function setupPageTransitions() {
  const pages = document.querySelectorAll('.page');
  
  pages.forEach(page => {
    if (!page.classList.contains('active-page')) {
      page.style.display = 'none';
    }
  });
}

// 导航到指定页面
function navigateToPage(pageId) {
  const pages = document.querySelectorAll('.page');
  const targetPage = document.getElementById(pageId);
  
  if (!targetPage) return;
  
  // 隐藏所有页面
  pages.forEach(page => {
    page.style.display = 'none';
    page.classList.remove('active-page');
  });
  
  // 显示目标页面
  targetPage.style.display = 'block';
  targetPage.classList.add('active-page', 'fade-in');
}

// 设置内容区域的滚动行为
function setupScrollBehavior() {
  const contentAreas = document.querySelectorAll('.content');
  
  contentAreas.forEach(content => {
    content.addEventListener('scroll', function() {
      // 下拉刷新模拟
      const scrollTop = this.scrollTop;
      
      if (scrollTop < -50) {
        // 这里可以模拟刷新操作
        // 实际开发时可以添加刷新动画
      }
    });
  });
}

// 处理页面返回
function goBack() {
  // 这里可以根据实际需求实现返回逻辑
  // 例如使用history API或自定义返回栈
  console.log('Going back');
}

// 搜索功能模拟
function performSearch(query) {
  console.log('Searching for:', query);
  // 这里可以根据实际需求实现搜索逻辑
}

// 阻止表单提交的默认行为
document.addEventListener('submit', function(e) {
  e.preventDefault();
  console.log('Form submission prevented');
});

// 添加点击波纹效果
function addRippleEffect() {
  const buttons = document.querySelectorAll('.btn, .tab-item, .list-item');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
} 