const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const registerRouter = require('./register');
const loginRouter = require('./login');
const userIdRouter = require('./userId');
const connection = require('./db');
const checkUsername = require('./checkUsername');
const checkEmail = require('./checkEmail');

const app = express();
const PORT = 3005;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/register', registerRouter);
app.use('/api/login', loginRouter);
app.use('/api/getUserData', userIdRouter);
app.use('/api/checkUsername',checkUsername);
app.use('/api/checkEmail', checkEmail);

/* 保持用户会话的中间件
const authenticateSession = (req, res, next) => {
  const { username, sessionId } = req.body;

  // 查询数据库验证session信息
  connection.query('SELECT * FROM user_sessions WHERE username = ? AND session_id = ?', [username, sessionId], (err, results) => {
    if (err) {
      console.error('数据库查询出错: ', err);
      res.status(500).json({ error: '服务器内部错误' });
    } else {
      if (results.length === 0) {
        return res.status(403).json({ error: '身份验证失败' });
      }
      
      next();
    }
  });
};

// 一个需要身份验证的示例路由
app.get('/api/protected', authenticateSession, (req, res) => {
  res.json({ message: '这是一个需要身份验证的路由' });
});
*/

app.get('/api/hello', (req, res) => {
  // add current time to the message
  const time = new Date().toLocaleTimeString();

  res.json({ message: `Msg from backend at ${time}: Hello, world!` });
});

app.get('/', (req, res) => {
  res.send('Hello, this is the UniHub backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
