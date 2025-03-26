const db = require('./db-tools');

async function showDatabaseSummary() {
    try {
        console.log('数据库摘要信息\n' + '='.repeat(50) + '\n');

        // 1. 显示所有表的结构
        console.log('表结构信息：\n');
        const tables = await db.query('SHOW TABLES');
        for (const table of tables) {
            const tableName = Object.values(table)[0];
            console.log(`\n${tableName}表结构：`);
            console.log('-'.repeat(30));
            
            const structure = await db.query(`DESCRIBE ${tableName}`);
            structure.forEach(field => {
                console.log(`字段: ${field.Field}`);
                console.log(`类型: ${field.Type}`);
                console.log(`可空: ${field.Null}`);
                console.log(`键类型: ${field.Key}`);
                console.log(`默认值: ${field.Default}`);
                console.log(`其他: ${field.Extra}`);
                console.log('-'.repeat(20));
            });

            // 显示记录数
            const countResult = await db.query(`SELECT COUNT(*) as count FROM ${tableName}`);
            console.log(`总记录数: ${countResult[0].count}\n`);
        }

        // 2. 显示新闻分类统计
        console.log('\n新闻分类统计：\n' + '-'.repeat(30));
        const categoryStats = await db.query(`
            SELECT 
                c.name, 
                COUNT(n.id) as news_count,
                MIN(n.published_at) as earliest_news,
                MAX(n.published_at) as latest_news
            FROM tb_categories c 
            LEFT JOIN tb_news n ON c.id = n.category_id 
            GROUP BY c.id, c.name
            ORDER BY c.id
        `);

        categoryStats.forEach(cat => {
            console.log(`\n分类: ${cat.name}`);
            console.log(`新闻数量: ${cat.news_count}`);
            if (cat.news_count > 0) {
                console.log(`最早新闻: ${cat.earliest_news}`);
                console.log(`最新新闻: ${cat.latest_news}`);
            }
        });

        // 3. 显示新闻来源统计
        console.log('\n\n新闻来源统计：\n' + '-'.repeat(30));
        const sourceStats = await db.query(`
            SELECT 
                source,
                COUNT(*) as count,
                MIN(published_at) as earliest,
                MAX(published_at) as latest
            FROM tb_news 
            GROUP BY source
            ORDER BY count DESC
        `);

        sourceStats.forEach(src => {
            console.log(`\n来源: ${src.source || '未知'}`);
            console.log(`新闻数量: ${src.count}`);
            console.log(`最早新闻: ${src.earliest}`);
            console.log(`最新新闻: ${src.latest}`);
        });

        // 4. 显示评论和问答统计
        console.log('\n\n互动统计：\n' + '-'.repeat(30));
        const commentCount = await db.query('SELECT COUNT(*) as count FROM tb_comments');
        const questionCount = await db.query('SELECT COUNT(*) as count FROM tb_questions');
        const answerCount = await db.query('SELECT COUNT(*) as count FROM tb_answers');

        console.log(`评论总数: ${commentCount[0].count}`);
        console.log(`问题总数: ${questionCount[0].count}`);
        console.log(`回答总数: ${answerCount[0].count}`);

    } catch (error) {
        console.error('获取数据库摘要失败:', error);
    } finally {
        await db.end();
    }
}

// 执行摘要
showDatabaseSummary(); 