const express = require('express');
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const bodyParser = require('body-parser')
const logger = require('morgan');

const { postRouter } = require('./routes/postRouter');
const { userRouter } = require('.routes/userRouter')

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());

app.get('/ping', (req, res) => {
  res.json('pong');
});

app.get('/', (req, res) => {
  res.json({ message: 'It is working' })
})


app.use('/posts', postRouter);
app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});