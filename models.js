const { Sequelize } = require('sequelize');
var express = require('express');

const sequelize = new Sequelize({
  database: 'carpooldb',
  dialect: 'postgres',
  define: {
    underscored: true,
  },
});

const router = express.Router();


// MODEL FOR riders HERE...
const Users = sequelize.define('users', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  pw_digest: Sequelize.STRING,
});

// MODEL FOR posts HERE...
const Posts = sequelize.define('posts', {
  origin: Sequelize.STRING,
  destination: Sequelize.STRING,
  date: Sequelize.DATEONLY,
  time: Sequelize.STRING,
  seats: Sequelize.INTEGER,
  price: Sequelize.STRING,
  stops: Sequelize.BOOLEAN,
  isDriver: Sequelize.BOOLEAN,
});

// RELATIONSHIP BETWEEN QUESTION AND ANSWER WILL BE ESTABLISHED HERE...
Users.hasMany(Posts);
Posts.belongsTo(Users);

module.exports = {
  Users,
  Posts,
  sequelize,
  router,
};