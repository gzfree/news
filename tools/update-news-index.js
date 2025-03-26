const db = require('./db-tools');

async function updateNewsIndex() {
    try {
        console.log('开始更新新闻表索引...\n');

        // 添加唯一索引
        await db.query(`
            ALTER TABLE tb_news 
            ADD UNIQUE INDEX idx_news_id (news_id)
        `);
        console.log('✓ 已添加 news_id 唯一索引\n');

        // 显示表结构
        const structure = await db.query('SHOW INDEX FROM tb_news');
        console.log('当前索引列表：\n');
        structure.forEach(index => {
            console.log(`索引名: ${index.Key_name}`);
            console.log(`字段: ${index.Column_name}`);
            console.log(`唯一性: ${index.Non_unique === 0 ? '是' : '否'}`);
            console.log('----------------------------------------');
        });

    } catch (error) {
        console.error('更新索引失败:', error);
    } finally {
        await db.end();
    }
}

// 执行更新
updateNewsIndex(); 