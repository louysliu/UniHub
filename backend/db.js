const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: 'root',
  password: 'root',
  database: 'unihub',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

module.exports = connection;

