const mongoose = require('mongoose');

const username = 'unihubroot'; // 替换为您的 MongoDB 用户名
const password = 'unihubroot'; // 替换为您的 MongoDB 密码
const dbName = 'unihub';

// 连接 MongoDB
mongoose.connect(`mongodb://${username}:${password}@localhost:27017/${dbName}`);

const mongodbConnection = mongoose.connection;

mongodbConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongodbConnection.once('open', () => {
  console.log('Connected to MongoDB database!');
});

module.exports = mongodbConnection;