const express = require('express');
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const bodyParser = require('body-parser')
const logger = require('morgan');

const { postRouter } = require('./routes/postRouter');

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());

app.get('/ping', (req, res) => {
  res.json('pong');
});

app.use('/posts', postRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});