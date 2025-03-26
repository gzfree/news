const db = require('./db-tools');

async function queryCategories() {
    try {
        console.log('正在获取新闻分类...');
        
        // 首先查看表结构
        const tableStructure = await db.query(`
            DESCRIBE tb_categories
        `);

        console.log('\n分类表结构:');
        console.log('----------------------------------------');
        tableStructure.forEach(field => {
            console.log(`字段名: ${field.Field}`);
            console.log(`类型: ${field.Type}`);
            console.log(`是否可空: ${field.Null}`);
            console.log(`键类型: ${field.Key}`);
            console.log(`默认值: ${field.Default || '无'}`);
            console.log(`额外信息: ${field.Extra || '无'}`);
            console.log('----------------------------------------');
        });

        // 查询分类信息
        const categories = await db.query(`
            SELECT *
            FROM tb_categories
            ORDER BY id ASC
        `);

        console.log('\n新闻分类列表:');
        console.log('----------------------------------------');
        categories.forEach(category => {
            Object.entries(category).forEach(([key, value]) => {
                console.log(`${key}: ${value || '无'}`);
            });
            console.log('----------------------------------------');
        });

        // 获取每个分类下的新闻数量
        const categoryCounts = await db.query(`
            SELECT 
                c.name as category_name,
                COUNT(n.id) as news_count
            FROM tb_categories c
            LEFT JOIN tb_news n ON c.id = n.category_id
            GROUP BY c.id, c.name
            ORDER BY c.id ASC
        `);

        console.log('\n各分类新闻数量:');
        console.log('----------------------------------------');
        categoryCounts.forEach(count => {
            console.log(`${count.category_name}: ${count.news_count} 条新闻`);
        });
        console.log('----------------------------------------');

    } catch (error) {
        console.error('查询分类失败:', error);
    } finally {
        await db.end();
    }
}

// 执行查询
queryCategories(); 