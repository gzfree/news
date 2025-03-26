const db = require('./db-tools');
const axios = require('axios');
const moment = require('moment');

// 配置项
const config = {
    // 爬取周期（分钟）
    interval: 30,
    
    // 国家配置（支持多个）
    countries: ['UAE', 'India', 'Egypt', 'Saudi Arabia', 'Pakistan'],
    
    // 语言配置（支持多个）
    languages: ['en'],
    
    // 分类配置（支持多个）- 使用分类ID
    categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    
    // 每次爬取每个来源最大新闻数
    maxNewsPerSource: 10,
    
    // 是否输出详细日志
    debug: true
};

async function fetchNewsFromSource(source, categoryId) {
    try {
        // 获取该来源最新的新闻时间
        const lastNews = await db.query(
            'SELECT published_at FROM tb_news WHERE source = ? ORDER BY published_at DESC LIMIT 1',
            [source.name]
        );
        
        const lastPublishTime = lastNews.length > 0 ? lastNews[0].published_at : null;
        
        // 构建API请求URL（这里使用示例URL，实际使用时需要替换为真实的API端点）
        const apiUrl = `https://newsapi.org/v2/everything?domains=${new URL(source.url).hostname}&language=${source.language}&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`;
        
        // 如果有最新新闻时间，则只获取更新的内容
        if (lastPublishTime) {
            const fromDate = moment(lastPublishTime).format('YYYY-MM-DD');
            apiUrl += `&from=${fromDate}`;
        }

        const response = await axios.get(apiUrl);
        const articles = response.data.articles || [];
        
        // 限制获取数量
        const limitedArticles = articles.slice(0, config.maxNewsPerSource);
        
        for (const article of limitedArticles) {
            // 生成唯一的news_id
            const newsId = Buffer.from(`${article.url}${article.publishedAt}`).toString('base64');
            
            // 检查是否已存在
            const existing = await db.query('SELECT id FROM tb_news WHERE news_id = ?', [newsId]);
            if (existing.length > 0) continue;
            
            // 插入新闻
            await db.query(`
                INSERT INTO tb_news (
                    news_id, source, author, title, description, 
                    url, image_url, content, published_at, category_id, 
                    tag, status
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [
                newsId,
                source.name,
                article.author,
                article.title,
                article.description,
                article.url,
                article.urlToImage,
                article.content,
                new Date(article.publishedAt),
                categoryId,
                source.country,
                0
            ]);
            
            if (config.debug) {
                console.log(`已添加新闻: ${article.title}`);
            }
        }
        
        return limitedArticles.length;
    } catch (error) {
        console.error(`从 ${source.name} 获取新闻失败:`, error.message);
        return 0;
    }
}

async function startScraping() {
    try {
        console.log(`开始爬取新闻 - ${new Date().toLocaleString()}`);
        
        // 获取符合配置的新闻来源
        const sources = await db.query(`
            SELECT * FROM tb_sources 
            WHERE country IN (?) 
            AND language IN (?)
            AND is_blacklisted = 0
        `, [config.countries, config.languages]);
        
        let totalNews = 0;
        
        // 对每个来源和分类进行爬取
        for (const source of sources) {
            for (const categoryId of config.categories) {
                const count = await fetchNewsFromSource(source, categoryId);
                totalNews += count;
            }
        }
        
        console.log(`本次爬取完成，共添加 ${totalNews} 条新闻\n`);
        
    } catch (error) {
        console.error('爬取过程出错:', error);
    }
}

// 启动定时爬取
async function init() {
    try {
        // 检查环境变量
        if (!process.env.NEWS_API_KEY) {
            throw new Error('请设置 NEWS_API_KEY 环境变量');
        }
        
        console.log('新闻爬取服务启动');
        console.log('配置信息:');
        console.log(`- 爬取周期: ${config.interval} 分钟`);
        console.log(`- 目标国家: ${config.countries.join(', ')}`);
        console.log(`- 目标语言: ${config.languages.join(', ')}`);
        console.log(`- 目标分类: ${config.categories.join(', ')}`);
        console.log(`- 每源最大新闻数: ${config.maxNewsPerSource}`);
        
        // 立即执行一次
        await startScraping();
        
        // 设置定时任务
        setInterval(startScraping, config.interval * 60 * 1000);
        
    } catch (error) {
        console.error('服务启动失败:', error);
        process.exit(1);
    }
}

// 启动服务
init(); 