const express = require('express');
const router = express.Router();
const connection = require('./db');

router.post('/', (req, res) => {
    console.log('Received data:', 'get email');
    const email = req.body.email;
    console.log('Received data:', email);

    // 进行用户名的唯一性检查
    const query = 'SELECT COUNT(*) as count FROM Users WHERE email = ?';
    connection.query(query, [email], (error, results, fields) => {
        if (error) {
            console.error('Error checking email uniqueness:', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            const count = results[0].count;
            if (count === 0) {
                res.json({ available: true }); // 邮箱可用
            } else {
                res.json({ available: false }); // 邮箱已被注册
            }
        }
    });
});

module.exports = router;