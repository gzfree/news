#!/bin/bash

# 设置颜色
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}开始恢复所有HTML文件到添加导航条之前的状态...${NC}"

# 处理news-app-html.html文件（已有备份）
if [ -f "news-app-html.html.bak" ]; then
  echo -e "${GREEN}恢复 news-app-html.html 从备份${NC}"
  cp news-app-html.html.bak news-app-html.html
fi

# 为所有HTML文件移除全局导航相关元素
for file in *.html; do
  echo -e "${BLUE}处理 $file ${NC}"
  
  # 创建临时文件
  TEMP_FILE="${file}.temp"
  
  # 移除导航占位符
  grep -v '<div class="global-nav"></div>' "$file" > "$TEMP_FILE"
  
  # 移除导航脚本引用
  grep -v '<script src="global-nav.js"></script>' "$TEMP_FILE" > "${TEMP_FILE}.2"
  
  # 替换原文件
  mv "${TEMP_FILE}.2" "$file"
  rm -f "$TEMP_FILE"
  
  echo -e "${GREEN}已从 $file 移除导航元素${NC}"
done

# 修改common.css，移除全局导航相关样式
echo -e "${BLUE}从common.css中移除全局导航样式...${NC}"
if [ -f "common.css" ]; then
  # 创建临时文件，不包含全局导航样式
  sed '/\/\* 全局导航样式 \*\//,/^}/d' common.css > common.css.temp
  
  # 替换原文件
  mv common.css.temp common.css
  
  echo -e "${GREEN}已从common.css中移除导航样式${NC}"
fi

echo -e "${GREEN}所有文件已恢复到添加导航条之前的状态！${NC}" 