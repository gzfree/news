#!/bin/bash

# 定义颜色输出
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# 更新所有HTML文件中的CSS引用路径
echo "正在更新CSS路径..."

# 在interactive-prototype目录中查找所有HTML文件
for html_file in interactive-prototype/*.html; do
  # 替换CSS路径
  sed -i '' 's|href="common.css"|href="/common.css"|g' "$html_file"
  echo -e "${GREEN}已更新${NC}: $html_file"
done

echo "所有CSS路径已更新!" 