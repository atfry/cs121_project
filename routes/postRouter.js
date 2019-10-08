const { Router } = require('express');
const { Users, Posts } = require('../models');
const { restrict } = require('../auth');

const PostRouter = Router();

PostRouter.post('/', restrict, async (req, res) => {
  const post = await Posts.create(req.body);
  const user = await Users.findByPk(res.locals.user.id);

  const ans = await post.setUser(user);
  console.log(ans.dataValues);
  res.json({ post });
});

PostRouter.get('/', async (req, res) => {
  const posts = await Posts.findAll();
  res.json({ posts });
});

PostRouter.delete('/:id', restrict, async (req, res) => {
  try {
    await Posts.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(`Success, post ${req.params.id} has been destroyed`);
  } catch (e) {
    console.log(e);
    res.status(401).send("Can't be deleted");
  }
})


module.exports = {
  PostRouter
};