const express = require('express');
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const bodyParser = require('body-parser')
const logger = require('morgan');
const { restrict } = require('./auth');

const { PostRouter } = require('./routes/PostRouter');
const { userRouter } = require('./routes/userRouter');
const { postGroupsRouter } = require('./routes/postGroupsRouter');

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use('/posts', PostRouter);
app.use('/users', userRouter);
app.use('/postgroups', postGroupsRouter);

app.get('/ping', (req, res) => {
  res.json('pong');
});

app.get('/', (req, res) => {
  res.json({ message: 'It is working' })
})


app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});