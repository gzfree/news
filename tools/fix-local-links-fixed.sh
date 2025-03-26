#!/bin/bash

# 设置颜色变量
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo "开始修复本地环境链接问题..."

# 进入interactive-prototype目录
cd interactive-prototype

# 首先移除所有重复的.html后缀
for file in *.html; do
  echo "处理文件: $file"
  
  # 1. 修复重复添加的.html后缀
  sed -i '' 's|href="\([^"]*\)\.html\.html"|href="\1.html"|g' "$file"
  
  # 2. 修复根路径，确保只有一个.html后缀
  sed -i '' 's|href="\.html"|href="index.html"|g' "$file"
  
  # 3. 确保所有导航链接都有正确的.html后缀
  sed -i '' 's|href="/dashboard"|href="dashboard.html"|g' "$file"
  sed -i '' 's|href="/"|href="index.html"|g' "$file"
  sed -i '' 's|href="/news"|href="news.html"|g' "$file"
  sed -i '' 's|href="/search"|href="search.html"|g' "$file"
  sed -i '' 's|href="/call"|href="noise-cancellation-en.html"|g' "$file"
  sed -i '' 's|href="/filters"|href="video-filters.html"|g' "$file"
  sed -i '' 's|href="/docs"|href="docs.html"|g' "$file"
  sed -i '' 's|href="/income-comparison"|href="dashboard.html"|g' "$file"
  sed -i '' 's|href="/voip"|href="dashboard.html"|g' "$file"
  sed -i '' 's|href="/docs/api"|href="docs.html"|g' "$file"
  sed -i '' 's|href="/docs/design"|href="docs.html"|g' "$file"
  
  # 4. 修复JS中的链接
  sed -i '' 's|window.location.href='"'"'[^'"'"']*\.html\.html'"'"'|window.location.href='"'"'index.html'"'"'|g' "$file"
  
  echo -e "${GREEN}✓${NC} 修复文件: $file"
done

echo -e "${GREEN}所有链接已修复!${NC}" 