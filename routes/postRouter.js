const { Router } = require('express');
const bcrypt = require('bcrypt');
const { Posts } = require('../models');

const SALT = 2 // some number
const PostRouter = Router();

PostRouter.route('/posts').post(function (req, res) {
    const post = new Posts(req.body);
    post.save()
});

module.exports = {
    PostRouter
};