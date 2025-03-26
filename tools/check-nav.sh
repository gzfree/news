#!/bin/bash

# 设置颜色
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}检查所有导航链接的有效性...${NC}"

# 检查global-nav.js文件中的链接
echo -e "${BLUE}检查global-nav.js文件中的链接...${NC}"
grep -n "href=\"" global-nav.js | cat

# 检查各个页面中的nav相关元素
echo -e "${BLUE}检查各个HTML页面中的导航相关元素...${NC}"
for file in *.html; do
  echo -e "${GREEN}检查 $file ${NC}"
  # 检查导航占位符
  if grep -q '<div class="global-nav"></div>' "$file"; then
    echo -e "  ✅ 包含导航占位符"
  else
    echo -e "  ${RED}❌ 缺少导航占位符${NC}"
  fi
  
  # 检查导航脚本引用
  if grep -q '<script src="global-nav.js"></script>' "$file"; then
    echo -e "  ✅ 包含导航脚本引用"
  else
    echo -e "  ${RED}❌ 缺少导航脚本引用${NC}"
  fi
  
  # 检查是否有重复的导航元素
  NAV_COUNT=$(grep -c '<div class="global-nav">' "$file")
  if [ "$NAV_COUNT" -gt 1 ]; then
    echo -e "  ${RED}❌ 警告：有 $NAV_COUNT 个导航元素，可能存在重复${NC}"
    grep -n '<div class="global-nav">' "$file" | cat
  else
    echo -e "  ✅ 导航元素数量正常"
  fi
done

echo -e "${BLUE}链接检查完成！${NC}" 