#!/bin/bash

# 脚本用于更新HTML文件中的相对路径链接为基于根目录的路径

echo "开始更新HTML文件中的链接..."

# 更新单个文件中的所有链接
update_links_in_file() {
    local file=$1
    echo "处理文件: $file"
    
    # 替换各种常见的链接模式
    # index.html -> /
    sed -i "" "s|window.location.href = 'index.html'|window.location.href = '/'|g" "$file"
    sed -i "" "s|onclick=\"window.location.href='index.html'|onclick=\"window.location.href='/'|g" "$file"
    sed -i "" "s|setTimeout(() => window.location.href='index.html'|setTimeout(() => window.location.href='/'|g" "$file"
    
    # news.html -> /news
    sed -i "" "s|window.location.href = 'news.html'|window.location.href = '/news'|g" "$file"
    sed -i "" "s|onclick=\"window.location.href='news.html'|onclick=\"window.location.href='/news'|g" "$file"
    sed -i "" "s|setTimeout(() => window.location.href='news.html'|setTimeout(() => window.location.href='/news'|g" "$file"
    
    # search.html -> /search
    sed -i "" "s|window.location.href = 'search.html'|window.location.href = '/search'|g" "$file"
    sed -i "" "s|onclick=\"window.location.href='search.html'|onclick=\"window.location.href='/search'|g" "$file"
    sed -i "" "s|setTimeout(() => window.location.href='search.html'|setTimeout(() => window.location.href='/search'|g" "$file"
    
    # search-result.html -> /search-result
    sed -i "" "s|window.location.href = 'search-result.html'|window.location.href = '/search-result'|g" "$file"
    sed -i "" "s|onclick=\"window.location.href='search-result.html'|onclick=\"window.location.href='/search-result'|g" "$file"
    sed -i "" "s|setTimeout(() => window.location.href='search-result.html'|setTimeout(() => window.location.href='/search-result'|g" "$file"
    
    # noise-cancellation-en.html -> /call
    sed -i "" "s|window.location.href = 'noise-cancellation-en.html'|window.location.href = '/call'|g" "$file"
    sed -i "" "s|onclick=\"window.location.href='noise-cancellation-en.html'|onclick=\"window.location.href='/call'|g" "$file"
    sed -i "" "s|setTimeout(() => window.location.href='noise-cancellation-en.html'|setTimeout(() => window.location.href='/call'|g" "$file"
    
    # video-filters.html -> /filters
    sed -i "" "s|window.location.href = 'video-filters.html'|window.location.href = '/filters'|g" "$file"
    sed -i "" "s|onclick=\"window.location.href='video-filters.html'|onclick=\"window.location.href='/filters'|g" "$file"
    sed -i "" "s|setTimeout(() => window.location.href='video-filters.html'|setTimeout(() => window.location.href='/filters'|g" "$file"
    
    # d-income-comparison.html -> /dashboard
    sed -i "" "s|window.location.href = 'd-income-comparison.html'|window.location.href = '/dashboard'|g" "$file"
    sed -i "" "s|onclick=\"window.location.href='d-income-comparison.html'|onclick=\"window.location.href='/dashboard'|g" "$file"
    sed -i "" "s|setTimeout(() => window.location.href='d-income-comparison.html'|setTimeout(() => window.location.href='/dashboard'|g" "$file"
    
    # d-voip.html -> /voip
    sed -i "" "s|window.location.href = 'd-voip.html'|window.location.href = '/voip'|g" "$file"
    sed -i "" "s|onclick=\"window.location.href='d-voip.html'|onclick=\"window.location.href='/voip'|g" "$file"
    sed -i "" "s|setTimeout(() => window.location.href='d-voip.html'|setTimeout(() => window.location.href='/voip'|g" "$file"
    
    # deepseek.html -> /deepseek
    sed -i "" "s|window.location.href = 'deepseek.html'|window.location.href = '/deepseek'|g" "$file"
    sed -i "" "s|onclick=\"window.location.href='deepseek.html'|onclick=\"window.location.href='/deepseek'|g" "$file"
    sed -i "" "s|setTimeout(() => window.location.href='deepseek.html'|setTimeout(() => window.location.href='/deepseek'|g" "$file"
}

# 更新interactive-prototype目录下的所有HTML文件
for file in interactive-prototype/*.html; do
    update_links_in_file "$file"
done

echo "链接更新完成!" 