#!/bin/bash

# 定义颜色输出
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# 替换视频链接的脚本
echo "正在修复视频链接..."

# 替换所有视频链接为备用链接
for html_file in interactive-prototype/*.html; do
  # 替换第一个视频链接 - 金发女子视频
  sed -i '' 's|https://assets.mixkit.co/videos/preview/mixkit-woman-with-blonde-hair-posing-smiling-for-camera-42365-large.mp4|https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4|g' "$html_file"
  
  # 替换第二个视频链接 - 粉耳朵女子视频
  sed -i '' 's|https://assets.mixkit.co/videos/preview/mixkit-woman-with-dark-hair-and-pink-ears-smiles-42366-large.mp4|https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4|g' "$html_file"
  
  # 替换第三个视频链接 - 蓝背景男子视频
  sed -i '' 's|https://assets.mixkit.co/videos/preview/mixkit-man-talking-on-blue-background-4866-large.mp4|https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_5mb.mp4|g' "$html_file"
  
  echo -e "${GREEN}已修复${NC}: $html_file"
done

echo "所有视频链接已修复!"