const jwt = require('jsonwebtoken');

const SECRET = 'you will never guess';

const genToken = (payload) => {
  const token = jwt.sign(payload, SECRET);
  return token;
};

const restrict = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, SECRET);
    res.locals.user = user;
    next();
  } catch (e) {
    console.log(e.message);
    res.status(401).send('Not Authorized');
  }
}

module.exports = {
  genToken,
  restrict,
};