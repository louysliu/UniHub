const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 3005;

// create connection to database
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// connect to database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

app.use(cors());

app.get('/api/hello', (req, res) => {
  // add current time to the message
  const time = new Date().toLocaleTimeString();
  
  res.json({ message: `Msg from backend at ${time}: Hello, world!` });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
