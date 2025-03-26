#!/bin/bash

# 设置颜色变量
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo "开始修复CSS路径问题..."

# 更新所有HTML文件中的CSS路径，将绝对路径改为相对路径
for file in interactive-prototype/*.html; do
  # 将绝对路径的CSS引用修改为相对路径
  sed -i '' 's|href="/common.css"|href="common.css"|g' "$file"
  
  echo -e "${GREEN}✓${NC} 修复文件: $file"
done

echo -e "${GREEN}所有CSS路径已修复!${NC}" 