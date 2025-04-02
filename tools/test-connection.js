const { testConnection } = require('../config/database');

async function runTest() {
    console.log('正在测试数据库连接...');
    const isConnected = await testConnection();
    
    if (isConnected) {
        console.log('连接测试成功！');
    } else {
        console.log('连接测试失败！');
    }
}

runTest(); 