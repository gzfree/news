#!/bin/bash

# 设置颜色
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}开始修复重复的导航元素...${NC}"

# 遍历所有HTML文件
for file in *.html; do
  echo -e "${BLUE}检查 $file ${NC}"
  
  # 计算<div class="global-nav"></div>出现的次数
  NAV_COUNT=$(grep -c '<div class="global-nav"></div>' "$file")
  
  if [ "$NAV_COUNT" -gt 1 ]; then
    echo -e "${RED}发现 $NAV_COUNT 个导航占位符，开始修复${NC}"
    
    # 创建临时文件
    TEMP_FILE="${file}.temp"
    
    # 移除所有导航占位符
    grep -v '<div class="global-nav"></div>' "$file" > "$TEMP_FILE"
    
    # 在<body>标签后添加一个新的导航占位符
    sed -i '' 's/<body>/<body>\n  <div class="global-nav"><\/div>/' "$TEMP_FILE"
    
    # 替换原文件
    mv "$TEMP_FILE" "$file"
    
    echo -e "${GREEN}已修复 $file 的重复导航占位符${NC}"
  else
    echo -e "${GREEN}文件 $file 导航占位符正常${NC}"
  fi
done

echo -e "${BLUE}验证修复结果...${NC}"
./check-nav.sh

echo -e "${GREEN}所有重复导航元素修复完成！${NC}" 