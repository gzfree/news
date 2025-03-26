const db = require('./db-tools');

async function updateNewsTable() {
    try {
        console.log('开始更新新闻表结构...\n');

        // 修改 news_id 字段长度
        await db.query(`
            ALTER TABLE tb_news 
            MODIFY COLUMN news_id VARCHAR(1000) NOT NULL
        `);
        console.log('✓ news_id 字段长度已更新为 1000\n');

        // 显示更新后的表结构
        const structure = await db.query('DESCRIBE tb_news');
        console.log('更新后的新闻表结构：\n');
        structure.forEach(field => {
            console.log(`字段名: ${field.Field}`);
            console.log(`类型: ${field.Type}`);
            console.log(`是否可空: ${field.Null}`);
            console.log(`键类型: ${field.Key || '无'}`);
            console.log(`默认值: ${field.Default || '无'}`);
            console.log(`额外信息: ${field.Extra || '无'}`);
            console.log('----------------------------------------');
        });

    } catch (error) {
        console.error('更新表结构失败:', error);
    } finally {
        await db.end();
    }
}

// 执行更新
updateNewsTable(); 