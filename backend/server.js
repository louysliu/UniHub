const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 3005;

// create connection to database
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: 'root',
  password: 'root',
  database: 'unihub',
});

// connect to database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

app.use(cors());

app.post('/api/register', (req, res) => {
  const { username, password } = req.body;

  // 检查用户名是否已存在
  db.query('SELECT * FROM Users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('数据库查询出错: ', err);
      res.status(500).json({ error: '服务器内部错误' });
    } else {
      if (results.length > 0) {
        res.json({ error: '用户名已被使用' });
      } else {
        // 插入新用户
        db.query('INSERT INTO Users (username, password) VALUES (?, ?)', [username, password], (err) => {
          if (err) {
            console.error('注册失败: ', err);
            res.status(500).json({ error: '服务器内部错误' });
          } else {
            res.json({ message: '注册成功' });
          }
        });
      }
    }
  });
});

// 登录接口
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // 查询用户是否存在
  db.query('SELECT * FROM Users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('数据库查询出错: ', err);
      res.status(500).json({ error: '服务器内部错误' });
    } else {
      if (results.length === 0) {
        res.json({ error: '用户不存在' });
      } else {
        // 比对密码
        if (results[0].password === password) {
          // 生成一个随机的session ID（这里简化，实际应用中应该使用更安全的方法生成session ID）
          const sessionId = Math.random().toString(36).substring(2);
          
          // 将session信息存储到数据库中
          const userId = results[0].user_id;
          db.query('INSERT INTO Sessions (session_id, user_id) VALUES (?, ?)', [sessionId, userId], (err) => {
            if (err) {
              console.error('存储session信息出错: ', err);
              res.status(500).json({ error: '服务器内部错误' });
            } else {
              res.json({ message: '登录成功', sessionId });
            }
          });
        } else {
          res.json({ error: '密码错误' });
        }
      }
    }
  });
});

// 保持用户会话的中间件
const authenticateSession = (req, res, next) => {
  const { username, sessionId } = req.body;

  // 查询数据库验证session信息
  db.query('SELECT * FROM user_sessions WHERE username = ? AND session_id = ?', [username, sessionId], (err, results) => {
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
