#!/bin/bash

# 脚本用于删除根目录中与子目录中重复的文件

echo "开始清理重复文件..."

# HTML文件列表 - 检查与interactive-prototype目录的重复
HTML_FILES=(
  "index.html"
  "news.html"
  "noise-cancellation-en.html"
  "noise-simplified.html"
  "search.html"
  "search-result.html"
  "video-filters.html"
)

# 检查并删除根目录中与interactive-prototype目录重复的HTML文件
for file in "${HTML_FILES[@]}"; do
  if [ -f "$file" ] && [ -f "interactive-prototype/$file" ]; then
    echo "删除重复文件: $file"
    rm "$file"
  fi
done

# 检查并删除根目录中与requirements目录重复的文件
if [ -f "PRD_Template.md" ] && [ -f "requirements/PRD_Template.md" ]; then
  echo "删除重复文件: PRD_Template.md"
  rm "PRD_Template.md"
fi

# 删除其他不需要的文件
if [ -f "video-filters.html.bak" ]; then
  echo "删除备份文件: video-filters.html.bak"
  rm "video-filters.html.bak"
fi

if [ -f "temp.html" ]; then
  echo "删除临时文件: temp.html"
  rm "temp.html"
fi

# 需要删除的文件列表
duplicates=(
"call-simplified.html"
"dashboard-simplified.html"
"filters-simplified.html"
"news-simplified.html"
"search-simplified.html"
"video-simplified.html"
"detail-simplified.html"
)

echo "清理完成!" 