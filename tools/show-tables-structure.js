const db = require('./db-tools');

async function showTablesStructure() {
    try {
        console.log('正在获取数据库表信息...\n');
        
        // 获取所有表名
        const tables = await db.query('SHOW TABLES');
        
        // 遍历每个表，显示其结构
        for (const table of tables) {
            const tableName = table[`Tables_in_mpnewsdb`];
            console.log(`\n表名: ${tableName}`);
            console.log('----------------------------------------');
            
            // 获取表结构
            const structure = await db.query(`DESCRIBE ${tableName}`);
            
            // 显示表结构
            structure.forEach(field => {
                console.log(`字段名: ${field.Field}`);
                console.log(`类型: ${field.Type}`);
                console.log(`是否可空: ${field.Null}`);
                console.log(`键类型: ${field.Key || '无'}`);
                console.log(`默认值: ${field.Default || '无'}`);
                console.log(`额外信息: ${field.Extra || '无'}`);
                console.log('----------------------------------------');
            });
            
            // 获取表中的记录数
            const [countResult] = await db.query(`SELECT COUNT(*) as count FROM ${tableName}`);
            console.log(`记录数量: ${countResult.count}\n`);
        }

    } catch (error) {
        console.error('获取表结构失败:', error);
    } finally {
        await db.end();
    }
}

// 执行查询
showTablesStructure(); 