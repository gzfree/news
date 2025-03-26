const db = require('./db-tools');

async function cleanDuplicateNews() {
    try {
        console.log('开始清理重复新闻...\n');

        // 获取所有新闻
        const news = await db.query('SELECT * FROM tb_news ORDER BY create_time DESC');
        console.log(`当前共有 ${news.length} 条新闻\n`);

        // 使用 Map 来存储唯一的新闻
        const uniqueNews = new Map();
        
        // 遍历新闻，保留最新的记录
        news.forEach(item => {
            const key = item.news_id.substring(0, 100);
            if (!uniqueNews.has(key)) {
                uniqueNews.set(key, item);
            }
        });

        // 找出需要删除的新闻
        const toDelete = news.filter(item => {
            const key = item.news_id.substring(0, 100);
            return uniqueNews.get(key).id !== item.id;
        });

        if (toDelete.length > 0) {
            // 逐个删除重复的新闻（使用主键）
            for (const item of toDelete) {
                await db.query('DELETE FROM tb_news WHERE id = ?', [item.id]);
            }
            console.log(`✓ 已删除 ${toDelete.length} 条重复新闻\n`);
        } else {
            console.log('没有发现重复新闻\n');
        }

        // 显示每个分类的新闻数量
        const categories = await db.query(`
            SELECT c.name, COUNT(n.id) as count 
            FROM tb_categories c 
            LEFT JOIN tb_news n ON c.id = n.category_id 
            GROUP BY c.id, c.name
            ORDER BY c.id
        `);
        
        console.log('各分类新闻数量：\n');
        categories.forEach(category => {
            console.log(`${category.name}: ${category.count} 条`);
        });

    } catch (error) {
        console.error('清理重复新闻失败:', error);
    } finally {
        await db.end();
    }
}

// 执行清理
cleanDuplicateNews(); 