const express = require('express');
const router = express.Router();
const mysqlConnection = require('./db');
const mongodbConnection = require('./db2');

router.get('/', async (req, res) => {
    try {
        const sessionFromCookie = req.cookies.sessionId;

        if (!sessionFromCookie) {
            throw new Error('Session ID not found');
        }

        const userIdFromSession = await getUserIdFromSession(sessionFromCookie);

        const userDataFromMySQL = await getUserDataFromMySQL(userIdFromSession);

        const folders = await getFoldersForUser(userIdFromSession);
        const files = await getFilesForUser(userIdFromSession);
        const recentFiles = await getRecentFilesForUser(userIdFromSession);

        const formattedFolders = formatFoldersAndFiles(folders, files);

        const userData = {
            userDataFromMySQL: userDataFromMySQL,
            userFoldersAndFiles: formattedFolders,
            recentFiles: recentFiles,
        };

        res.status(200).json({ message: 'User data fetched successfully', userData });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: error.message || 'Failed to fetch user data' });
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

function getUserDataFromMySQL(userId) {
    return new Promise((resolve, reject) => {
        mysqlConnection.query('SELECT nickname, email FROM Users WHERE user_id = ?', [userId], (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            if (results.length > 0) {
                const userData = {
                    nickname: results[0].nickname,
                    email: results[0].email
                };
                resolve(userData);
            } else {
                reject(new Error('User not found'));
            }
        });
    });
}

async function getFoldersForUser(userId) {
    return await mongodbConnection.collection('folder').find({ user_id: userId }).toArray();
}

async function getFilesForUser(userId) {
    return await mongodbConnection.collection('file').find({ user_id: userId }).toArray();
}

async function getRecentFilesForUser(userId) {
    return await mongodbConnection.collection('file').find({ user_id: userId }).sort({ last_updated: -1 }).limit(5).toArray();
}

function formatFoldersAndFiles(folders, files) {
    const foldersMap = new Map();

    folders.forEach(folder => {
        folder.children = [];
        foldersMap.set(folder.folder_id.toString(), folder);
    });

    files.forEach(file => {
        const folderId = file.folder_id.toString();
        const folder = foldersMap.get(folderId);
        if (folder) {
            folder.children.push(file);
        }
    });

    const rootFolders = [];
    foldersMap.forEach(folder => {
        if (!folder.parent_id) {
            rootFolders.push(folder);
        } else {
            const parentFolder = foldersMap.get(folder.parent_id.toString());
            if (parentFolder) {
                parentFolder.children.push(folder);
            }
        }
    });

    return rootFolders;
}

module.exports = router;
