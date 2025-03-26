const db = require('./db-tools');

async function showSourceTable() {
    try {
        console.log('新闻来源表内容\n' + '='.repeat(50) + '\n');

        const sources = await db.query(`
            SELECT 
                id,
                name,
                url,
                country,
                language,
                is_blacklisted,
                blacklist_reason,
                create_time,
                update_time
            FROM tb_sources
            ORDER BY id
        `);

        if (sources.length === 0) {
            console.log('来源表中暂无数据');
            return;
        }

        console.log(`共有 ${sources.length} 个新闻来源：\n`);

        sources.forEach(source => {
            console.log(`[ID: ${source.id}] ${source.name}`);
            console.log('-'.repeat(30));
            console.log(`URL: ${source.url}`);
            console.log(`国家: ${source.country}`);
            console.log(`语言: ${source.language}`);
            console.log(`状态: ${source.is_blacklisted ? '已拉黑' : '正常'}`);
            if (source.blacklist_reason) {
                console.log(`拉黑原因: ${source.blacklist_reason}`);
            }
            console.log(`创建时间: ${source.create_time}`);
            console.log(`更新时间: ${source.update_time}`);
            console.log('\n');
        });

    } catch (error) {
        console.error('获取来源表数据失败:', error);
    } finally {
        await db.end();
    }
}

// 执行显示
showSourceTable(); 