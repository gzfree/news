// 设备切换功能
function initDeviceSwitcher() {
  // 如果已经存在切换器，则不重复创建
  if (document.querySelector('.device-switcher')) {
    return;
  }

  // 创建设备切换器容器
  const switcher = document.createElement('div');
  switcher.className = 'device-switcher';
  
  // 创建移动端按钮
  const mobileBtn = document.createElement('button');
  mobileBtn.className = 'device-btn mobile-btn active';
  mobileBtn.innerHTML = '📱 移动端';
  mobileBtn.title = '切换到移动端视图';
  
  // 创建桌面端按钮
  const desktopBtn = document.createElement('button');
  desktopBtn.className = 'device-btn desktop-btn';
  desktopBtn.innerHTML = '💻 桌面端';
  desktopBtn.title = '切换到桌面端视图';
  
  // 添加按钮到切换器
  switcher.appendChild(mobileBtn);
  switcher.appendChild(desktopBtn);
  
  // 添加切换器到页面
  document.body.appendChild(switcher);
  
  // 添加样式
  const style = document.createElement('style');
  style.textContent = `
    .device-switcher {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgba(0, 0, 0, 0.7);
      padding: 8px;
      border-radius: 30px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      z-index: 9999;
      display: flex;
      gap: 8px;
    }
    
    .device-btn {
      border: none;
      background: transparent;
      color: #fff;
      padding: 8px 12px;
      border-radius: 20px;
      cursor: pointer;
      font-size: 14px;
      opacity: 0.7;
      transition: all 0.2s ease;
    }
    
    .device-btn:hover {
      opacity: 1;
    }
    
    .device-btn.active {
      background: rgba(255, 255, 255, 0.2);
      opacity: 1;
    }
    
    /* 移动端样式 */
    body.mobile-view .app-container {
      width: 390px;
      height: 844px;
      margin: 20px auto;
      border-radius: 40px;
      overflow: hidden;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
    }
    
    /* 桌面端样式 */
    body.desktop-view .app-container {
      width: 100%;
      height: 100vh;
      margin: 0;
      border-radius: 0;
      max-width: none;
      box-shadow: none;
    }
    
    body.desktop-view {
      background: #f2f2f7;
      padding: 0;
    }
    
    /* 桌面端适配样式 */
    @media (min-width: 1024px) {
      body.desktop-view .bottom-nav {
        height: 60px;
        padding-bottom: 0;
      }
      
      body.desktop-view .status-bar {
        display: none;
      }
      
      body.desktop-view .header,
      body.desktop-view .search-bar,
      body.desktop-view .tabs {
        max-width: 1200px;
        margin: 0 auto;
      }
      
      body.desktop-view .tab-content {
        max-width: 1200px;
        margin: 0 auto;
      }
    }
  `;
  
  document.head.appendChild(style);
  
  // 初始设置为移动端
  document.body.classList.add('mobile-view');
  
  // 添加事件监听
  mobileBtn.addEventListener('click', function() {
    mobileBtn.classList.add('active');
    desktopBtn.classList.remove('active');
    document.body.classList.remove('desktop-view');
    document.body.classList.add('mobile-view');
  });
  
  desktopBtn.addEventListener('click', function() {
    desktopBtn.classList.add('active');
    mobileBtn.classList.remove('active');
    document.body.classList.remove('mobile-view');
    document.body.classList.add('desktop-view');
  });
}

// 页面加载后初始化设备切换器
document.addEventListener('DOMContentLoaded', function() {
  initDeviceSwitcher();
}); 