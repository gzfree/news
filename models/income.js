const db = require('../config/database');

class IncomeModel {
    // 获取每日收入数据
    static async getDailyIncome(date) {
        try {
            const [rows] = await db.query(
                'SELECT * FROM income_data WHERE date = ?',
                [date]
            );
            return rows[0];
        } catch (error) {
            console.error('获取每日收入数据失败:', error);
            throw error;
        }
    }

    // 获取收入来源数据
    static async getIncomeSources(date) {
        try {
            const [rows] = await db.query(
                'SELECT * FROM income_sources WHERE date = ?',
                [date]
            );
            return rows;
        } catch (error) {
            console.error('获取收入来源数据失败:', error);
            throw error;
        }
    }

    // 获取收入分布数据
    static async getIncomeDistribution(date) {
        try {
            const [rows] = await db.query(
                'SELECT * FROM income_distribution WHERE date = ?',
                [date]
            );
            return rows;
        } catch (error) {
            console.error('获取收入分布数据失败:', error);
            throw error;
        }
    }

    // 插入每日收入数据
    static async insertDailyIncome(data) {
        try {
            const [result] = await db.query(
                'INSERT INTO income_data (date, botim3_total, botim4_total, difference, percent_change) VALUES (?, ?, ?, ?, ?)',
                [data.date, data.botim3Total, data.botim4Total, data.difference, data.percentChange]
            );
            return result.insertId;
        } catch (error) {
            console.error('插入每日收入数据失败:', error);
            throw error;
        }
    }

    // 插入收入来源数据
    static async insertIncomeSources(data) {
        try {
            const values = data.map(item => [
                item.date,
                item.placement,
                item.botim3Amount,
                item.botim4Amount
            ]);
            
            const [result] = await db.query(
                'INSERT INTO income_sources (date, placement, botim3_amount, botim4_amount) VALUES ?',
                [values]
            );
            return result.affectedRows;
        } catch (error) {
            console.error('插入收入来源数据失败:', error);
            throw error;
        }
    }

    // 插入收入分布数据
    static async insertIncomeDistribution(data) {
        try {
            const values = data.map(item => [
                item.date,
                item.source,
                item.amount
            ]);
            
            const [result] = await db.query(
                'INSERT INTO income_distribution (date, source, amount) VALUES ?',
                [values]
            );
            return result.affectedRows;
        } catch (error) {
            console.error('插入收入分布数据失败:', error);
            throw error;
        }
    }
}

module.exports = IncomeModel; 