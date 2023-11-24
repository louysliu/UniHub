const express = require('express');
const router = express.Router();
const connection = require('./db');

router.post('/', (req, res) => {
    console.log('Received data:', 'get registration info');
    const receivedData = req.body;
    console.log('Received data:', receivedData);
    const {
        username,
        email,
        password,
        nickname
    } = req.body;

    // 进行用户名和邮箱的唯一性检查
    connection.query('SELECT * FROM Users WHERE username = ? OR email = ?', [username, email], (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
            res.status(401).json({
                success: false,
                message: '用户名或邮箱已存在'
            });
        } else {
            // 用户不存在，执行插入操作
            connection.query('INSERT INTO Users (username, email, password, name) VALUES (?, ?, ?, ?)', [username, email, password, nickname], (error, results) => {
                if (error) throw error;

                res.json({
                    success: true,
                    message: '注册成功，请登录'
                });
            });
        }
    });
});

module.exports = router;