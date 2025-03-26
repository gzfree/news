// 全局导航JavaScript文件
// 处理全局导航栏的交互逻辑

document.addEventListener('DOMContentLoaded', function() {
  console.log('全局导航脚本已加载');
  
  // 处理子菜单显示/隐藏
  const navItems = document.querySelectorAll('.global-nav-item');
  
  if (navItems) {
    navItems.forEach(item => {
      item.addEventListener('click', function(e) {
        // 防止链接跳转
        if (this.querySelector('.submenu')) {
          e.preventDefault();
        }
        
        // 切换子菜单显示状态
        const submenu = this.querySelector('.submenu');
        if (submenu) {
          submenu.classList.toggle('active');
        }
      });
    });
  }
}); 