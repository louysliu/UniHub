const express = require('express');
const router = express.Router();
const mysqlConnection = require('./db');
const mongodbConnection = require('./db2');

router.get('/', async (req, res) => {
    try {
        const sessionFromCookie = req.cookies.sessionId;
        console.log('Received data:', 'get cookie');
        console.log('Received data:', sessionFromCookie);
        if (!sessionFromCookie) {
            throw new Error('Session ID not found');
        }

        console.log('Received data:', 'get file_id');
        const file_id = req.query.file_id;
        console.log('Received data:', file_id);

        const userIdFromSession = await getUserIdFromSession(sessionFromCookie);

        const FileData = await getFileData(userIdFromSession, file_id);

        const fileData = {
            FileData: FileData,
        };

        res.status(200).json({ message: 'file data fetched successfully', fileData });
    } catch (error) {
        console.error('Error fetching file data:', error);
        res.status(500).json({ error: error.message || 'Failed to fetch file data' });
    }
});

function getUserIdFromSession(session) {
    return new Promise((resolve, reject) => {
        mysqlConnection.query('SELECT user_id FROM Sessions WHERE session_id = ?', [session], (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            if (results.length > 0) {
                resolve(results[0].user_id);
            } else {
                reject(new Error('Session not found'));
            }
        });
    });
}

async function getFileData(userId, fileId) {
    try {
        // 假设您的数据库连接实例是mongodbConnection
        const file = await mongodbConnection.collection('file').findOne({ user_id: userId, file_id: fileId });

        if (file) {
            return file; // 如果找到文件，则返回文件对象
        } else {
            throw new Error('File not found'); // 如果未找到文件，则抛出错误
        }
    } catch (error) {
        throw new Error(`Error fetching file data`);
    }
}

module.exports = router;
