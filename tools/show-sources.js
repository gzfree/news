const db = require('./db-tools');

async function showSources() {
    try {
        console.log('新闻来源统计\n' + '='.repeat(50) + '\n');

        // 获取来源统计
        const sourceStats = await db.query(`
            SELECT 
                source,
                COUNT(*) as count,
                MIN(published_at) as earliest,
                MAX(published_at) as latest,
                GROUP_CONCAT(DISTINCT category_id) as categories
            FROM tb_news 
            GROUP BY source
            ORDER BY count DESC
        `);

        // 获取分类名称
        const categories = await db.query('SELECT id, name FROM tb_categories');
        const categoryMap = new Map(categories.map(cat => [cat.id, cat.name]));

        // 获取每个来源的示例新闻
        for (const src of sourceStats) {
            console.log(`\n来源: ${src.source || '未知'}`);
            console.log('-'.repeat(30));
            console.log(`新闻数量: ${src.count}`);
            console.log(`最早新闻: ${src.earliest}`);
            console.log(`最新新闻: ${src.latest}`);
            
            // 显示该来源的新闻分类
            if (src.categories) {
                const categoryNames = src.categories.split(',')
                    .map(id => categoryMap.get(parseInt(id)))
                    .filter(Boolean);
                console.log(`新闻分类: ${categoryNames.join(', ')}`);
            }

            // 显示该来源的示例新闻
            const sampleNews = await db.query(`
                SELECT title, published_at 
                FROM tb_news 
                WHERE source = ? 
                ORDER BY published_at DESC 
                LIMIT 2
            `, [src.source]);

            console.log('\n最新新闻示例:');
            sampleNews.forEach(news => {
                console.log(`- ${news.title}`);
                console.log(`  发布时间: ${news.published_at}`);
            });
        }

    } catch (error) {
        console.error('获取来源统计失败:', error);
    } finally {
        await db.end();
    }
}

// 执行显示
showSources(); 