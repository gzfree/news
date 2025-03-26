const mysql = require('mysql2/promise');

class DatabaseTools {
    constructor() {
        this.pool = mysql.createPool({
            host: '172.16.10.64',
            port: 3306,
            user: 'mpnewsdb_rw',
            password: 'mpnewsdbrw_123ni5',
            database: 'mpnewsdb',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            connectTimeout: 30000,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0,
            ssl: {
                rejectUnauthorized: false
            }
        });
    }

    async testConnection() {
        try {
            console.log('正在尝试连接数据库...');
            const connection = await this.pool.getConnection();
            console.log('成功获取数据库连接！');
            
            // 测试查询
            console.log('执行测试查询...');
            const [rows] = await connection.query('SELECT 1');
            console.log('测试查询结果:', rows);
            
            // 获取数据库信息
            const [version] = await connection.query('SELECT VERSION() as version');
            console.log('MySQL版本:', version[0].version);
            
            connection.release();
            return true;
        } catch (err) {
            console.error('数据库连接失败:', err);
            if (err.code === 'ETIMEDOUT') {
                console.log('连接超时，请检查：');
                console.log('1. 网络连接是否正常');
                console.log('2. 服务器防火墙设置');
                console.log('3. 是否需要通过VPN访问');
            } else if (err.code === 'ECONNREFUSED') {
                console.log('连接被拒绝，请检查：');
                console.log('1. MySQL服务是否运行');
                console.log('2. 端口是否正确');
                console.log('3. 服务器是否允许远程连接');
            } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
                console.log('访问被拒绝，请检查：');
                console.log('1. 用户名是否正确');
                console.log('2. 密码是否正确');
                console.log('3. 用户是否有远程访问权限');
            }
            return false;
        }
    }

    async query(sql, params = []) {
        try {
            const [results] = await this.pool.execute(sql, params);
            return results;
        } catch (error) {
            console.error('查询执行失败:', error);
            throw error;
        }
    }

    async transaction(callback) {
        const connection = await this.pool.getConnection();
        await connection.beginTransaction();

        try {
            const result = await callback(connection);
            await connection.commit();
            return result;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    async end() {
        await this.pool.end();
    }
}

module.exports = new DatabaseTools(); 