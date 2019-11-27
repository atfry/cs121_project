const { Router } = require('express');
const bcrypt = require('bcrypt');
const { Users } = require('../models');
const { genToken, restrict } = require('../auth.js');

const SALT = 2
const userRouter = Router();

userRouter.post('/', async (req, res) => {
  const {
    password,
    username,
    email
  } = req.body;

  const pw_digest = await bcrypt.hash(password, SALT);
  const user = await Users.create({
    name: username,
    pw_digest: pw_digest,
    email,
  });
  const { password_digest, ...userData } = user.dataValues;
  const token = genToken(userData);

  res.json({ user: userData, token });
});

userRouter.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ where: { name: username } });
    const isValidPass = await bcrypt.compare(password, user.pw_digest);
    if (isValidPass) {
      const { pw_digest, ...userData } = user.dataValues;
      const token = genToken(userData);
      res.json({ token, user: userData });
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (e) {
    console.log(e.message);
    res.status(401).send('Invalid credentials');
  }
});

userRouter.get('/verify', restrict, (req, res) => {
  res.json({ user: res.locals.user });
});

module.exports = {
  userRouter
};