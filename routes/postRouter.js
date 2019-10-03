const { Router } = require('express');
const { Users, Posts } = require('../models');
const { restrict } = require('../auth');

const PostRouter = Router();

PostRouter.post('/', restrict, async (req, res) => {
  const post = await Posts.create(req.body);
  // const user = await User.findByPk(res.locals.user.id);

  // const ans = await post.setUser(user);
  console.log(ans.dataValues);
  res.json({ post });
});

PostRouter.get('/', async (req, res) => {
  const posts = await Posts.findAll();
  res.json({ posts });
});

module.exports = {
  PostRouter
};