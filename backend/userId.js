const express = require('express');
const router = express.Router();
const connection = require('./db');

router.get('/', (req, res) => {
    console.log('Received data:', 'get cookie');
    const Cookie = req.cookies.sessionId;
    console.log('Received data:', Cookie);
    
});

module.exports = router;
