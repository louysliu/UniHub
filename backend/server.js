const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3005;

app.use(cors());

app.get('/helloworld', (req, res) => {
  res.json({ message: 'Hello World from UniHub!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
