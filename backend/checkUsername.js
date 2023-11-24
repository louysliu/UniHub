const express = require('express');
const router = express.Router();
const connection = require('./db');

router.post('/', (req, res) => {
    console.log('Received data:', 'get username');
    const username = req.body.username;
    console.log('Received data:', username);

    // 进行用户名的唯一性检查
    const query = 'SELECT COUNT(*) as count FROM Users WHERE username = ?';
    connection.query(query, [username], (error, results, fields) => {
        if (error) {
            console.error('Error checking username uniqueness:', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            const count = results[0].count;
            if (count === 0) {
                res.json({ available: true }); // 用户名可用
            } else {
                res.json({ available: false }); // 用户名已被注册
            }
        }
    });
});

module.exports = router;