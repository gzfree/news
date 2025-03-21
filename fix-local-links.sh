#!/bin/bash

# 设置颜色变量
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo "开始修复本地环境链接问题..."

# 进入interactive-prototype目录
cd interactive-prototype

# 修复各种形式的链接路径
for file in *.html; do
  echo "处理文件: $file"
  
  # 1. 修复绝对路径到相对路径 (例如 href="/news" 改为 href="news.html")
  sed -i '' 's|href="/\([^"]*\)"|href="\1.html"|g' "$file"
  
  # 2. 修复根路径 (例如 href="/" 改为 href="index.html")
  sed -i '' 's|href="/"|href="index.html"|g' "$file"
  
  # 3. 修复其他类型的链接 (例如 onclick="window.location.href='/news'" 改为 onclick="window.location.href='news.html'")
  sed -i '' 's|window.location.href='"'"'/\([^'"'"']*\)'"'"'|window.location.href='"'"'\1.html'"'"'|g' "$file"
  sed -i '' 's|window.location.href='"'"'/'"'"'|window.location.href='"'"'index.html'"'"'|g' "$file"
  
  # 4. 修复setTimeout中的链接
  sed -i '' 's|setTimeout.*window.location.href=.*'"'"'/\([^'"'"']*\)'"'"'.*)|setTimeout(() => { window.location.href='"'"'\1.html'"'"'; }, 1500)|g' "$file"
  
  echo -e "${GREEN}✓${NC} 修复文件: $file"
done

echo -e "${GREEN}所有链接已修复!${NC}" 