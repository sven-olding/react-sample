const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({path: __dirname + '/../.env'});

const app = express();

const dist = path.join(__dirname + '/../', 'dist');

app.use(express.static(dist));

const PORT = process.env.SERVER_PORT;

app.get('*', (req, res) => {
  res.sendFile(path.join(dist, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running, listening on port ${PORT}`);
});
