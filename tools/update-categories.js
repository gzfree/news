const db = require('./db-tools');

async function updateCategories() {
    try {
        console.log('正在更新新闻分类为英文...');
        
        // 中英文对照的分类
        const categories = [
            { id: 1, oldName: '国内新闻', newName: 'Domestic News' },
            { id: 2, oldName: '国际新闻', newName: 'International News' },
            { id: 3, oldName: '科技', newName: 'Technology' },
            { id: 4, oldName: '财经', newName: 'Finance' },
            { id: 5, oldName: '体育', newName: 'Sports' },
            { id: 6, oldName: '娱乐', newName: 'Entertainment' },
            { id: 7, oldName: '教育', newName: 'Education' },
            { id: 8, oldName: '健康', newName: 'Health' },
            { id: 9, oldName: '社会', newName: 'Society' },
            { id: 10, oldName: '文化', newName: 'Culture' }
        ];

        // 更新每个分类
        for (const category of categories) {
            await db.query(
                'UPDATE tb_categories SET name = ? WHERE id = ?',
                [category.newName, category.id]
            );
            console.log(`已更新分类: ${category.oldName} -> ${category.newName}`);
        }

        console.log('\n分类更新完成！');

        // 查询更新后的所有分类
        const allCategories = await db.query('SELECT * FROM tb_categories ORDER BY id ASC');
        
        console.log('\n当前所有分类:');
        console.log('----------------------------------------');
        allCategories.forEach(category => {
            console.log(`ID: ${category.id}, Name: ${category.name}`);
        });
        console.log('----------------------------------------');

    } catch (error) {
        console.error('更新分类失败:', error);
    } finally {
        await db.end();
    }
}

// 执行更新
updateCategories(); 