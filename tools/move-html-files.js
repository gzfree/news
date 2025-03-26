#!/usr/bin/env node

/**
 * 移动根目录HTML文件到temp目录的脚本
 */

const fs = require('fs');
const path = require('path');

// 要移动的HTML文件
const htmlFiles = [
  './index.html',
  './news-app-html.html',
  './noise-cancellation-en.html',
  './noise-cancellation.html',
  './noise-simplified.html',
  './search-result.html',
  './search.html',
  './search_results_with_ai.html',
  './temp.html',
  './uae_news_report.html',
  './video-filters.html',
  './voiptest.html',
  './volcano-sdk-features.html'
];

// 目标目录
const targetDir = './temp';

// 确保目标目录存在
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log(`创建目录: ${targetDir}`);
}

// 移动文件
console.log('==== 移动HTML文件到temp目录 ====');

let movedCount = 0;
let errorCount = 0;

htmlFiles.forEach(file => {
  if (fs.existsSync(file)) {
    try {
      const fileName = path.basename(file);
      const targetPath = path.join(targetDir, fileName);
      
      // 复制文件到目标目录
      fs.copyFileSync(file, targetPath);
      
      // 删除原文件
      fs.unlinkSync(file);
      
      console.log(`成功移动: ${file} -> ${targetPath}`);
      movedCount++;
    } catch (err) {
      console.error(`移动 ${file} 时出错:`, err);
      errorCount++;
    }
  } else {
    console.log(`文件不存在: ${file}`);
  }
});

console.log('\n==== 移动完成 ====');
console.log(`成功移动: ${movedCount} 个文件`);
if (errorCount > 0) {
  console.log(`失败: ${errorCount} 个文件`);
}

// 更新README中的链接（如果存在）
const readmePath = './README.md';
if (fs.existsSync(readmePath)) {
  try {
    let readmeContent = fs.readFileSync(readmePath, 'utf8');
    
    // 更新链接，将根目录的HTML文件引用更改为temp目录
    htmlFiles.forEach(file => {
      const fileName = path.basename(file);
      // 查找URL中的文件名，并将其替换为temp/文件名
      const regex = new RegExp(`(https?://[^/]+/)${fileName}`, 'g');
      readmeContent = readmeContent.replace(regex, `$1temp/${fileName}`);
    });
    
    // 写回README文件
    fs.writeFileSync(readmePath, readmeContent);
    console.log('\n已更新README.md中的链接');
  } catch (err) {
    console.error('更新README.md时出错:', err);
  }
} 