const axios = require('axios');

const API_KEY = 'e57737331a44419ab6755001c0402948';
const BASE_URL = 'https://newsapi.org/v2';

async function listSources() {
    try {
        console.log('获取可用新闻来源列表...\n');

        const response = await axios.get(`${BASE_URL}/sources`, {
            params: {
                language: 'en',
                apiKey: API_KEY
            }
        });

        const sources = response.data.sources;
        console.log(`找到 ${sources.length} 个新闻来源:\n`);

        // 按国家分组显示
        const sourcesByCountry = {};
        sources.forEach(source => {
            if (!sourcesByCountry[source.country]) {
                sourcesByCountry[source.country] = [];
            }
            sourcesByCountry[source.country].push(source);
        });

        // 显示我们感兴趣的国家的新闻来源
        const targetCountries = ['ae', 'in', 'eg', 'sa', 'pk'];
        targetCountries.forEach(country => {
            const countrySources = sourcesByCountry[country] || [];
            console.log(`\n${country.toUpperCase()} 的新闻来源:`);
            console.log('----------------------------------------');
            if (countrySources.length === 0) {
                console.log('没有找到可用的新闻来源');
            } else {
                countrySources.forEach(source => {
                    console.log(`ID: ${source.id}`);
                    console.log(`名称: ${source.name}`);
                    console.log(`描述: ${source.description}`);
                    console.log('----------------------------------------');
                });
            }
        });

    } catch (error) {
        console.error('获取新闻来源失败:', error.response ? error.response.data : error.message);
    }
}

// 执行查询
listSources(); 