const express = require('express');
const IncomeModel = require('./models/income');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// 中间件
app.use(express.json());
app.use(express.static('public'));

// API路由
app.get('/api/income/daily/:date', async (req, res) => {
    try {
        const incomeData = await IncomeModel.getDailyIncome(req.params.date);
        res.json(incomeData);
    } catch (error) {
        res.status(500).json({ error: '获取每日收入数据失败' });
    }
});

app.get('/api/income/sources/:date', async (req, res) => {
    try {
        const sources = await IncomeModel.getIncomeSources(req.params.date);
        res.json(sources);
    } catch (error) {
        res.status(500).json({ error: '获取收入来源数据失败' });
    }
});

app.get('/api/income/distribution/:date', async (req, res) => {
    try {
        const distribution = await IncomeModel.getIncomeDistribution(req.params.date);
        res.json(distribution);
    } catch (error) {
        res.status(500).json({ error: '获取收入分布数据失败' });
    }
});

// 提供静态HTML文件
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'data-analysis/d-income-comparison.html'));
});

// 启动服务器
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
}); 