const axios = require('axios');

// API key
const API_KEY = 'e57737331a44419ab6755001c0402948';
const BASE_URL = 'https://newsapi.org/v2';

async function testNewsAPI() {
    try {
        console.log('测试 NewsAPI 功能...\n');

        // 1. 测试获取头条新闻
        console.log('1. 获取头条新闻:');
        const headlines = await axios.get(`${BASE_URL}/top-headlines`, {
            params: {
                country: 'us',
                apiKey: API_KEY
            }
        });
        console.log(`获取到 ${headlines.data.articles.length} 条头条新闻`);
        // 显示前3条新闻的标题
        headlines.data.articles.slice(0, 3).forEach((article, index) => {
            console.log(`${index + 1}. ${article.title}`);
        });
        console.log();

        // 2. 测试搜索新闻
        console.log('2. 搜索新闻 (关键词: technology):');
        const search = await axios.get(`${BASE_URL}/everything`, {
            params: {
                q: 'technology',
                language: 'en',
                sortBy: 'publishedAt',
                apiKey: API_KEY
            }
        });
        console.log(`搜索到 ${search.data.articles.length} 条相关新闻`);
        // 显示前3条新闻的标题
        search.data.articles.slice(0, 3).forEach((article, index) => {
            console.log(`${index + 1}. ${article.title}`);
        });
        console.log();

        // 3. 测试获取新闻来源
        console.log('3. 获取新闻来源列表:');
        const sources = await axios.get(`${BASE_URL}/sources`, {
            params: {
                apiKey: API_KEY
            }
        });
        console.log(`获取到 ${sources.data.sources.length} 个新闻来源`);
        // 显示前5个新闻来源
        sources.data.sources.slice(0, 5).forEach((source, index) => {
            console.log(`${index + 1}. ${source.name} (${source.id})`);
        });

        console.log('\n测试完成！');

    } catch (error) {
        console.error('测试失败:', error.response ? error.response.data : error.message);
    }
}

// 执行测试
testNewsAPI(); 