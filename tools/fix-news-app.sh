#!/bin/bash

# 设置颜色
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}开始修复news-app-html.html文件...${NC}"

# 检查文件结构并修复
file="news-app-html.html"

echo -e "${BLUE}备份原始文件...${NC}"
cp "$file" "${file}.bak"

echo -e "${BLUE}添加全局导航占位符...${NC}"

# 使用sed在<body>标签后添加全局导航占位符
sed -i '' 's/<body>/<body>\n  <div class="global-nav"><\/div>/' "$file"

# 检查是否已包含app-container
if grep -q "<div class=\"app-container\">" "$file"; then
  echo -e "${GREEN}app-container已存在，无需添加${NC}"
else
  # 将内容包装在app-container中
  sed -i '' 's/<body>\n  <div class="global-nav"><\/div>/<body>\n  <div class="global-nav"><\/div>\n  <div class="app-container">/' "$file"
  # 在</body>前添加闭合标签
  sed -i '' 's/<\/body>/<\/div>\n<\/body>/' "$file"
  echo -e "${GREEN}已添加app-container包装${NC}"
fi

# 清理可能存在的多余导航元素
echo -e "${BLUE}清理可能存在的旧导航元素...${NC}"
grep -n "global-nav" "$file" | cat

# 确保导航脚本引用存在
if ! grep -q "<script src=\"global-nav.js\"></script>" "$file"; then
  echo -e "${BLUE}添加导航脚本引用...${NC}"
  sed -i '' 's/<\/body>/<script src="global-nav.js"><\/script>\n<\/body>/' "$file"
  echo -e "${GREEN}已添加导航脚本引用${NC}"
fi

echo -e "${GREEN}修复完成！${NC}"
echo -e "${BLUE}执行检查脚本验证结果...${NC}"
./check-nav.sh | grep -A3 "检查 $file" | cat