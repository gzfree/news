const axios = require('axios');
const db = require('./db-tools');

const API_KEY = 'e57737331a44419ab6755001c0402948';
const BASE_URL = 'https://newsapi.org/v2';

// 可用的新闻来源配置
const sources = [
    { id: 'google-news-in', name: 'Google News (India)', country: 'India' },
    { id: 'the-hindu', name: 'The Hindu', country: 'India' },
    { id: 'the-times-of-india', name: 'The Times of India', country: 'India' }
];

// 获取新闻分类ID
async function getCategoryId(categoryName) {
    const result = await db.query('SELECT id FROM tb_categories WHERE name = ?', [categoryName]);
    return result[0]?.id;
}

// 获取新闻来源ID
async function getSourceId(sourceName) {
    const result = await db.query('SELECT id FROM tb_sources WHERE name = ?', [sourceName]);
    return result[0]?.id;
}

// 保存新闻到数据库
async function saveNews(article, source, categoryId) {
    try {
        const sourceId = await getSourceId(source.name);

        const newsData = {
            news_id: article.url, // 使用URL作为唯一标识
            source: article.source.name,
            author: article.author || null,
            title: article.title,
            description: article.description,
            url: article.url,
            image_url: article.urlToImage,
            content: article.content,
            published_at: new Date(article.publishedAt),
            category_id: categoryId,
            tag: source.country
        };

        await db.query(`
            INSERT INTO tb_news 
            (news_id, source, author, title, description, url, image_url, content, published_at, category_id, tag)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, Object.values(newsData));

        console.log(`✓ 保存新闻: ${article.title}`);
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            console.log(`新闻已存在: ${article.title}`);
        } else {
            console.error('保存新闻失败:', error);
        }
    }
}

// 爬取新闻
async function crawlNews() {
    try {
        console.log('开始爬取国际新闻...\n');

        for (const source of sources) {
            console.log(`\n爬取 ${source.name} 的新闻...`);
            
            // 获取新闻
            const response = await axios.get(`${BASE_URL}/everything`, {
                params: {
                    sources: source.id,
                    pageSize: 5,
                    sortBy: 'publishedAt',
                    language: 'en',
                    apiKey: API_KEY
                }
            });

            const articles = response.data.articles;
            console.log(`获取到 ${articles.length} 条新闻\n`);

            // 处理每条新闻
            for (const article of articles) {
                // 根据新闻标题和描述判断分类
                let categoryId;
                const text = `${article.title} ${article.description || ''}`.toLowerCase();
                
                if (text.includes('business') || text.includes('economy') || text.includes('finance')) {
                    categoryId = await getCategoryId('Finance');
                } else if (text.includes('tech') || text.includes('technology') || text.includes('digital')) {
                    categoryId = await getCategoryId('Technology');
                } else if (text.includes('sport') || text.includes('sports')) {
                    categoryId = await getCategoryId('Sports');
                } else if (text.includes('entertainment') || text.includes('celebrity')) {
                    categoryId = await getCategoryId('Entertainment');
                } else if (text.includes('health') || text.includes('medical')) {
                    categoryId = await getCategoryId('Health');
                } else if (text.includes('education')) {
                    categoryId = await getCategoryId('Education');
                } else if (text.includes('society') || text.includes('social')) {
                    categoryId = await getCategoryId('Society');
                } else if (text.includes('culture') || text.includes('art')) {
                    categoryId = await getCategoryId('Culture');
                } else {
                    // 默认分类为国际新闻
                    categoryId = await getCategoryId('International News');
                }

                await saveNews(article, source, categoryId);
            }
        }

        // 显示爬取结果
        console.log('\n爬取完成，显示结果：');
        const results = await db.query(`
            SELECT c.name as category, COUNT(*) as count 
            FROM tb_news n 
            JOIN tb_categories c ON n.category_id = c.id 
            GROUP BY c.name
        `);
        
        console.log('\n各分类新闻数量：');
        results.forEach(row => {
            console.log(`${row.category}: ${row.count} 条`);
        });

    } catch (error) {
        console.error('爬取新闻失败:', error.response ? error.response.data : error.message);
    } finally {
        await db.end();
    }
}

// 执行爬取
crawlNews(); 