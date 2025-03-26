#!/usr/bin/env node

/**
 * 清理重复文件脚本
 * 用途：
 * 1. 删除工程中的空文件
 * 2. 将重复图片整理到一个目录
 * 3. 移除重复的模板文件
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 要清理的空文件
const emptyFiles = [
  './Please',
  './Success!',
  './news.html',
];

// 重复图片组
const duplicateImages = [
  {
    files: [
      './data-analysis/images/121742560671_.pic.jpg',
      './data-analysis/images/ar-helmet.jpg',
      './data-analysis/images/avatar-example.jpg',
      './data-analysis/images/虚拟形象.jpg',
    ],
    keepFile: './data-analysis/images/ar-helmet.jpg'
  },
  {
    files: [
      './data-analysis/images/fist-gesture.jpg',
      './data-analysis/images/背景图模糊 和背景替换.jpg',
    ],
    keepFile: './data-analysis/images/fist-gesture.jpg'
  },
  {
    files: [
      './data-analysis/images/151742560676_.pic.jpg',
      './data-analysis/images/ar-stickers.jpg',
      './data-analysis/images/头部3D挂件.jpg',
    ],
    keepFile: './data-analysis/images/ar-stickers.jpg'
  },
  {
    files: [
      './data-analysis/images/161742560677_.pic.jpg',
      './data-analysis/images/style-rendering.jpg',
      './data-analysis/images/挂件.jpg',
    ],
    keepFile: './data-analysis/images/style-rendering.jpg'
  },
  {
    files: [
      './data-analysis/images/141742560674_.pic.jpg',
      './data-analysis/images/avatar-drive-ui.jpg',
      './data-analysis/images/换头.jpg',
    ],
    keepFile: './data-analysis/images/avatar-drive-ui.jpg'
  },
];

// 其他重复文件
const duplicateFiles = [
  {
    files: [
      './PRD_Template.md',
      './requirements/PRD_Template.md',
    ],
    keepFile: './requirements/PRD_Template.md'
  },
  {
    files: [
      './temp.html',
      './video-filters.html.bak',
    ],
    keepFile: './temp.html'
  },
];

// 创建备份目录
const backupDir = './tools/duplicate_backup';
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
  console.log(`创建备份目录: ${backupDir}`);
}

// 处理空文件
console.log('==== 处理空文件 ====');
emptyFiles.forEach(file => {
  try {
    if (fs.existsSync(file)) {
      const stats = fs.statSync(file);
      if (stats.size === 0) {
        fs.unlinkSync(file);
        console.log(`删除空文件: ${file}`);
      }
    }
  } catch (err) {
    console.error(`处理文件 ${file} 时出错:`, err);
  }
});

// 处理重复图片
console.log('\n==== 处理重复图片 ====');
duplicateImages.forEach(group => {
  const keepFile = group.keepFile;
  group.files.forEach(file => {
    if (file !== keepFile && fs.existsSync(file)) {
      const backupPath = path.join(backupDir, path.basename(file));
      try {
        // 复制到备份目录
        fs.copyFileSync(file, backupPath);
        // 删除原文件
        fs.unlinkSync(file);
        console.log(`移动重复图片 ${file} 到备份目录`);
      } catch (err) {
        console.error(`处理文件 ${file} 时出错:`, err);
      }
    }
  });
});

// 处理其他重复文件
console.log('\n==== 处理其他重复文件 ====');
duplicateFiles.forEach(group => {
  const keepFile = group.keepFile;
  group.files.forEach(file => {
    if (file !== keepFile && fs.existsSync(file)) {
      const backupPath = path.join(backupDir, path.basename(file));
      try {
        // 复制到备份目录
        fs.copyFileSync(file, backupPath);
        // 删除原文件
        fs.unlinkSync(file);
        console.log(`移动重复文件 ${file} 到备份目录`);
      } catch (err) {
        console.error(`处理文件 ${file} 时出错:`, err);
      }
    }
  });
});

console.log('\n清理完成！重复文件已被移动到备份目录。'); 