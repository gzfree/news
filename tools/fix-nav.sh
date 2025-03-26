#!/bin/bash

# 设置颜色变量
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo "开始修复导航栏重复问题..."

# 遍历所有HTML文件
for file in interactive-prototype/*.html; do
  # 删除导航栏中的重复项
  sed -i '' '
  /<a href="\/dashboard" class="global-nav-item">Analytics/,/<a href="\/docs" class="global-nav-item">Documentation/d
  ' "$file"
  
  echo -e "${GREEN}✓${NC} 修复文件: $file"
done

echo -e "${GREEN}所有导航栏已修复!${NC}" 