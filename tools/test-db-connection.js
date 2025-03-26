const db = require('./db-tools');

async function testDatabaseConnection() {
    console.log('正在测试数据库连接...');
    
    try {
        const isConnected = await db.testConnection();
        
        if (isConnected) {
            console.log('连接测试成功！');
            
            // 测试简单查询
            console.log('正在执行测试查询...');
            const results = await db.query('SHOW TABLES');
            console.log('数据库表列表:', results);
        } else {
            console.log('连接测试失败！');
        }
    } catch (error) {
        console.error('测试过程中发生错误:', error);
    } finally {
        // 关闭数据库连接池
        await db.end();
    }
}

// 执行测试
testDatabaseConnection(); 