#!/bin/bash

# 设置工作目录
cd "$(dirname "$0")/interactive-prototype"

# 处理所有HTML文件
for file in *.html; do
  echo "处理文件: $file"
  
  # 创建临时文件
  cp "$file" "$file.tmp"
  
  # 使用sed删除从全局导航开始到结束div的内容
  sed -i'.bak' '/<a href=".*" class="global-nav-item">/,/<\/div>/d' "$file.tmp"
  
  # 移动临时文件回原文件
  mv "$file.tmp" "$file"
  
  # 删除备份文件
  rm -f "$file.tmp.bak"
done

echo "所有页面的P和D导航链接已删除" 