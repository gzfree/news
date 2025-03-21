#!/bin/bash

# 设置颜色
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}开始更新所有页面的导航组件...${NC}"

# 遍历所有HTML文件
for file in *.html; do
  # 检查是否已经引入导航脚本
  if grep -q "global-nav.js" "$file"; then
    echo -e "${GREEN}文件 $file 已包含导航脚本，跳过${NC}"
  else
    # 在</body>标签前添加导航脚本引用
    sed -i '' 's#</body>#<script src="global-nav.js"></script>\n</body>#' "$file"
    echo -e "${GREEN}已更新 $file，添加了导航脚本${NC}"
  fi
  
  # 检查是否存在旧的导航栏代码，如果存在则移除
  if grep -q '<div class="global-nav">' "$file"; then
    # 使用 sed 删除整个导航栏区域
    # 尝试查找并删除包含完整导航的代码块
    sed -i '' '/<div class="global-nav">/,/<\/div>/d' "$file"
    echo -e "${GREEN}已从 $file 移除旧导航代码${NC}"
  fi
  
  # 在页面中添加全局导航占位符（如果不存在）
  if ! grep -q '<div class="global-nav"></div>' "$file"; then
    # 在.app-container前添加导航占位符
    sed -i '' 's/<div class="app-container">/<div class="global-nav"><\/div>\n<div class="app-container">/' "$file"
    echo -e "${GREEN}已为 $file 添加导航占位符${NC}"
  fi
done

echo -e "${BLUE}所有页面导航更新完成！${NC}" 