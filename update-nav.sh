#!/bin/bash

# 设置颜色变量
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo "开始更新导航栏样式..."

# 更新所有HTML文件中的导航栏
for file in interactive-prototype/*.html; do
  # 用简洁版本替换原导航栏
  sed -i '' '
  /<div class="global-nav">/,/<\/div>/ {
    /<div class="global-nav">/c\
    <div class="global-nav">\
      <a href="/dashboard" class="global-nav-item">A <span class="nav-arrow">▾</span>\
        <div class="submenu">\
          <a href="/dashboard" class="submenu-item">Dashboard</a>\
          <a href="/income-comparison" class="submenu-item">Income Comparison</a>\
          <a href="/voip" class="submenu-item">VOIP Metrics</a>\
        </div>\
      </a>\
      <a href="/" class="global-nav-item active">P <span class="nav-arrow">▾</span>\
        <div class="submenu">\
          <a href="/" class="submenu-item">Home</a>\
          <a href="/news" class="submenu-item">News</a>\
          <a href="/search" class="submenu-item">Search</a>\
          <a href="/call" class="submenu-item">Call</a>\
          <a href="/filters" class="submenu-item">Filters</a>\
        </div>\
      </a>\
      <a href="/docs" class="global-nav-item">D <span class="nav-arrow">▾</span>\
        <div class="submenu">\
          <a href="/docs" class="submenu-item">Requirements</a>\
          <a href="/docs/api" class="submenu-item">API Docs</a>\
          <a href="/docs/design" class="submenu-item">Design System</a>\
        </div>\
      </a>
    /<\/div>/d
  }' "$file"
  
  echo -e "${GREEN}✓${NC} 更新文件: $file"
done

echo -e "${GREEN}所有导航栏已更新!${NC}" 