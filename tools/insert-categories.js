const db = require('./db-tools');

async function insertCategories() {
    try {
        console.log('正在插入新闻分类...');
        
        // 基本新闻分类
        const categories = [
            { name: '国内新闻' },
            { name: '国际新闻' },
            { name: '科技' },
            { name: '财经' },
            { name: '体育' },
            { name: '娱乐' },
            { name: '教育' },
            { name: '健康' },
            { name: '社会' },
            { name: '文化' }
        ];

        // 插入分类
        for (const category of categories) {
            await db.query(
                'INSERT INTO tb_categories (name) VALUES (?)',
                [category.name]
            );
            console.log(`已添加分类: ${category.name}`);
        }

        console.log('\n分类添加完成！');

        // 查询所有分类
        const allCategories = await db.query('SELECT * FROM tb_categories ORDER BY id ASC');
        
        console.log('\n当前所有分类:');
        console.log('----------------------------------------');
        allCategories.forEach(category => {
            console.log(`ID: ${category.id}, 名称: ${category.name}`);
        });
        console.log('----------------------------------------');

    } catch (error) {
        console.error('插入分类失败:', error);
    } finally {
        await db.end();
    }
}

// 执行插入
insertCategories(); 