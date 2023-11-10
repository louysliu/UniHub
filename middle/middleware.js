const express = require('express');
const axios = require('axios');

const app = express();
const port = 3001;

app.use(express.json());

// 转发注册请求到后端
app.post('/api/register', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:3005/api/register', req.body);
    res.json(response.data);
  } catch (error) {
    console.error('中间层请求失败: ', error);
    res.status(500).json({ error: '中间层请求失败' });
  }
});

// 转发登录请求到后端
app.post('/api/login', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:3005/api/login', req.body);
    res.json(response.data);
  } catch (error) {
    console.error('中间层请求失败: ', error);
    res.status(500).json({ error: '中间层请求失败' });
  }
});

app.listen(port, () => {
  console.log(`中间层服务器已启动，监听端口 ${port}`);
});
