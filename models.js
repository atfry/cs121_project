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
  joinedUsers: Sequelize.STRING,
  user_id: Sequelize.STRING
});


const PostGroups = sequelize.define('postgroups', {
  user_id: Sequelize.INTEGER,
  post_id: Sequelize.STRING,
})

// RELATIONSHIP BETWEEN Posts AND Users WILL BE Post Groups HERE...
Users.hasMany(Posts);
Posts.belongsTo(Users);
// PostGroups.hasMany(Users);
// PostGroups.belongsTo(Users);


module.exports = {
  Users,
  Posts,
  PostGroups,
  sequelize,
  router,
};