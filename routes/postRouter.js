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

PostRouter.delete('/:id', async (req, res) => {
  try {
    await Posts.destroy({
      where: { id: req.params.id }
    })
    res.json(`Success, post ${req.params.id} has been destroyed`);
  } catch (e) {
    console.log(e);
    res.status(401).send("Can't be deleted");
  }
})

PostRouter.put('/:id', async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const id = parseInt(req.params.id);
    await Posts.update(
      {origin: data.posts.origin,
        destination: data.posts.destination,
        date: data.posts.date,
        time: data.posts.time,
        seats: data.posts.seats,
        stops: data.posts.stops}, 
      {where: { id },
    });
    const post = await Posts.findOne({
      where: { id },
    });
    console.log(post);
    res.json({ post });
  } catch (e) {
    console.log(e.message);
    res.status(500).send(e.message);
  }
})


module.exports = {
  PostRouter
};