const db = require('./db-tools');

async function createSourcesTable() {
    try {
        console.log('开始创建新闻来源表...\n');

        // 创建新闻来源表
        await db.query(`
            CREATE TABLE IF NOT EXISTS tb_sources (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                url VARCHAR(1000) NOT NULL,
                country VARCHAR(50) NOT NULL,
                language VARCHAR(20) NOT NULL,
                is_blacklisted BOOLEAN DEFAULT FALSE,
                blacklist_reason TEXT,
                create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
                update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        console.log('✓ 新闻来源表创建成功\n');

        // 添加一些初始新闻来源
        const sources = [
            // 阿联酋新闻来源
            { name: 'Gulf News', url: 'https://gulfnews.com', country: 'UAE', language: 'en' },
            { name: 'The National', url: 'https://www.thenationalnews.com', country: 'UAE', language: 'en' },
            // 印度新闻来源
            { name: 'The Times of India', url: 'https://timesofindia.indiatimes.com', country: 'India', language: 'en' },
            { name: 'The Hindu', url: 'https://www.thehindu.com', country: 'India', language: 'en' },
            // 埃及新闻来源
            { name: 'Egypt Today', url: 'https://www.egypttoday.com', country: 'Egypt', language: 'en' },
            { name: 'Ahram Online', url: 'https://english.ahram.org.eg', country: 'Egypt', language: 'en' },
            // 沙特新闻来源
            { name: 'Arab News', url: 'https://www.arabnews.com', country: 'Saudi Arabia', language: 'en' },
            { name: 'Saudi Gazette', url: 'https://saudigazette.com.sa', country: 'Saudi Arabia', language: 'en' },
            // 巴基斯坦新闻来源
            { name: 'Dawn', url: 'https://www.dawn.com', country: 'Pakistan', language: 'en' },
            { name: 'The Express Tribune', url: 'https://tribune.com.pk', country: 'Pakistan', language: 'en' }
        ];

        for (const source of sources) {
            await db.query(
                'INSERT INTO tb_sources (name, url, country, language) VALUES (?, ?, ?, ?)',
                [source.name, source.url, source.country, source.language]
            );
        }
        console.log('✓ 初始新闻来源添加成功\n');

        // 显示所有新闻来源
        const results = await db.query('SELECT * FROM tb_sources');
        console.log('当前新闻来源列表：\n');
        results.forEach(source => {
            console.log(`${source.id}. ${source.name} (${source.country})`);
        });

    } catch (error) {
        console.error('创建新闻来源表失败:', error);
    } finally {
        await db.end();
    }
}

// 执行创建
createSourcesTable(); 