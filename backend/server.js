const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const registerRouter = require('./register');
const loginRouter = require('./login');
const checkUsername = require('./checkUsername');
const checkEmail = require('./checkEmail');
const getUserData = require('./getalldata');
const getFileData = require('./getfiledata');

const app = express();
const PORT = 3005;

app.use(cors({
  origin: 'http://localhost:8080', // 允许所有来源访问，仅用于调试阶段
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/register', registerRouter);
app.use('/api/login', loginRouter);
app.use('/api/checkUsername',checkUsername);
app.use('/api/checkEmail', checkEmail);
app.use('/api/getUserData',getUserData);
app.use('/api/getFileData',getFileData);

app.get('/api/hello', (req, res) => {
  // add current time to the message
  const time = new Date().toLocaleTimeString();

  res.json({ message: `Msg from backend at ${time}: Hello, world!` });
});

app.get('/', (req, res) => {
  res.send('Hello, this is the UniHub backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
