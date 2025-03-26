const db = require('./db-tools');

async function showNews() {
    try {
        console.log('新闻内容列表\n' + '='.repeat(100) + '\n');

        const news = await db.query(`
            SELECT 
                n.*,
                c.name as category_name
            FROM tb_news n
            LEFT JOIN tb_categories c ON n.category_id = c.id
            ORDER BY n.published_at DESC
        `);

        if (news.length === 0) {
            console.log('新闻表中暂无内容');
            return;
        }

        news.forEach((item, index) => {
            console.log(`[${index + 1}] ${item.title}`);
            console.log('-'.repeat(100));
            console.log(`分类: ${item.category_name || '未分类'}`);
            console.log(`来源: ${item.source || '未知'}`);
            console.log(`作者: ${item.author || '未知'}`);
            console.log(`发布时间: ${item.published_at}`);
            console.log(`描述: ${item.description || '无'}`);
            console.log(`URL: ${item.url || '无'}`);
            if (item.image_url) {
                console.log(`图片: ${item.image_url}`);
            }
            if (item.tag) {
                console.log(`标签: ${item.tag}`);
            }
            console.log(`状态: ${item.status === 0 ? '正常' : '其他'}`);
            console.log('\n' + '='.repeat(100) + '\n');
        });

        console.log(`共显示 ${news.length} 条新闻`);

    } catch (error) {
        console.error('获取新闻列表失败:', error);
    } finally {
        await db.end();
    }
}

// 执行显示
showNews(); 