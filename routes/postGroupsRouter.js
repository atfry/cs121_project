const { Router } = require('express');
const { Users, Posts, PostGroups } = require('../models');
const { restrict } = require('../auth');

const postGroupsRouter = Router();

postGroupsRouter.post('/', restrict, async (req, res) => {
    const join = await PostGroups.create(req.body);
    res.json({ join });
}); 

postGroupsRouter.get('/', async (req, res) => {
    const posts = await PostGroups.findAll();
    res.json({ posts });
  });

postGroupsRouter.delete('/:id', async (req, res) => {
    try {
        await PostGroups.destroy({
            where: { id: req.params.id }
        })
        res.json(`Success, post ${req.params.id} has been destroyed`);
    } catch (e) {
        console.log(e);
        res.status(401).send("Can't be deleted");
    }
});

module.exports = {
    postGroupsRouter
};