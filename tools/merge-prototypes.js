#!/usr/bin/env node

/**
 * 合并prototype和interactive-prototype目录的脚本
 * 如果有重复文件，保留最新的版本
 */

const fs = require('fs');
const path = require('path');

// 源目录
const prototypeDir = './prototype';
const interactiveDir = './interactive-prototype';
const backupDir = './tools/prototype_backup';

// 确保备份目录存在
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
    console.log(`创建备份目录: ${backupDir}`);
}

// 获取文件的最后修改时间
function getFileModTime(filePath) {
    try {
        const stats = fs.statSync(filePath);
        return stats.mtime;
    } catch (err) {
        console.error(`获取文件时间失败: ${filePath}`, err);
        return new Date(0); // 返回一个很早的时间
    }
}

// 复制文件
function copyFile(src, dest) {
    try {
        fs.copyFileSync(src, dest);
        console.log(`复制文件: ${src} -> ${dest}`);
    } catch (err) {
        console.error(`复制文件失败: ${src}`, err);
    }
}

// 获取目录中的所有文件
function getAllFiles(dir) {
    const files = new Set();
    
    function traverse(currentDir) {
        const items = fs.readdirSync(currentDir);
        items.forEach(item => {
            const fullPath = path.join(currentDir, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                if (item !== 'assets') { // 跳过assets目录
                    traverse(fullPath);
                }
            } else {
                const relativePath = path.relative(dir, fullPath);
                files.add(relativePath);
            }
        });
    }
    
    traverse(dir);
    return files;
}

console.log('开始合并目录...');

// 获取两个目录中的所有文件
const prototypeFiles = getAllFiles(prototypeDir);
const interactiveFiles = getAllFiles(interactiveDir);

// 处理所有文件
const allFiles = new Set([...prototypeFiles, ...interactiveFiles]);

allFiles.forEach(file => {
    const prototypePath = path.join(prototypeDir, file);
    const interactivePath = path.join(interactiveDir, file);
    
    const prototypeExists = fs.existsSync(prototypePath);
    const interactiveExists = fs.existsSync(interactivePath);
    
    // 如果两个目录都有这个文件
    if (prototypeExists && interactiveExists) {
        const prototypeTime = getFileModTime(prototypePath);
        const interactiveTime = getFileModTime(interactivePath);
        
        // 备份旧文件
        const backupPath = path.join(backupDir, file);
        fs.mkdirSync(path.dirname(backupPath), { recursive: true });
        
        if (prototypeTime > interactiveTime) {
            // prototype版本更新
            copyFile(prototypePath, backupPath);
            copyFile(prototypePath, interactivePath);
            console.log(`使用prototype版本: ${file}`);
        } else {
            // interactive版本更新
            copyFile(interactivePath, backupPath);
            copyFile(interactivePath, prototypePath);
            console.log(`使用interactive版本: ${file}`);
        }
    }
    // 如果只有interactive-prototype有这个文件
    else if (interactiveExists) {
        copyFile(interactivePath, prototypePath);
        console.log(`复制到prototype: ${file}`);
    }
});

// 特殊处理assets目录
console.log('\n处理assets目录...');

const assetsBackupDir = path.join(backupDir, 'assets');
if (!fs.existsSync(assetsBackupDir)) {
    fs.mkdirSync(assetsBackupDir, { recursive: true });
}

function mergeAssets(sourceDir, targetDir) {
    if (!fs.existsSync(sourceDir)) return;
    
    const items = fs.readdirSync(sourceDir);
    items.forEach(item => {
        const sourcePath = path.join(sourceDir, item);
        const targetPath = path.join(targetDir, item);
        const backupPath = path.join(assetsBackupDir, item);
        
        if (fs.statSync(sourcePath).isFile()) {
            if (fs.existsSync(targetPath)) {
                const sourceTime = getFileModTime(sourcePath);
                const targetTime = getFileModTime(targetPath);
                
                // 备份并使用较新的文件
                if (sourceTime > targetTime) {
                    copyFile(targetPath, backupPath);
                    copyFile(sourcePath, targetPath);
                    console.log(`使用source assets: ${item}`);
                }
            } else {
                copyFile(sourcePath, targetPath);
                console.log(`复制新assets文件: ${item}`);
            }
        }
    });
}

// 确保assets目录存在
const prototypeAssetsDir = path.join(prototypeDir, 'assets');
const interactiveAssetsDir = path.join(interactiveDir, 'assets');

if (!fs.existsSync(prototypeAssetsDir)) {
    fs.mkdirSync(prototypeAssetsDir, { recursive: true });
}

// 合并assets目录
mergeAssets(interactiveAssetsDir, prototypeAssetsDir);

console.log('\n合并完成！旧文件已备份到:', backupDir); 