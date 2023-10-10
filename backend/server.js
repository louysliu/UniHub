const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3005;

app.use(cors());

app.get('/api/hello', (req, res) => {
  // add current time to the message
  const time = new Date().toLocaleTimeString();
  
  res.json({ message: `Msg from backend at ${time}: Hello, world!` });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
