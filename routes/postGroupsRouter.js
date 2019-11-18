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

module.exports = {
    postGroupsRouter
};