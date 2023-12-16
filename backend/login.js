const express = require('express');
const router = express.Router();
const connection = require('./db');

router.post('/', (req, res) => {
  console.log('Received data:', 'get login info');
  const receivedData = req.body;
  console.log('Received data:', receivedData);
  const { usernameOrEmail, password } = req.body;

  // 查询用户是否存在
  connection.query('SELECT * FROM Users WHERE username = ? OR email = ?', [usernameOrEmail, usernameOrEmail], (err, results) => {
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
          
          const insertQuery = 'INSERT INTO Sessions (session_id, user_id) VALUES (?, ?) ' +
            'ON DUPLICATE KEY UPDATE session_id = VALUES(session_id)';

          connection.query(insertQuery, [sessionId, userId], (err) => {
            if (err) {
              console.error('存储session信息出错: ', err);
              res.status(500).json({ error: '服务器内部错误' });
            } else {
              res.status(200).json({ message: '登录成功', sessionId });
            }
          });
        } else {
          res.json({ error: '密码错误' });
        }
      }
    }
  });
});

module.exports = router;


