const router = require('express').Router();
const { where } = require('sequelize');
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['user_name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    let posts = await Post.findAll({
      include: [{
        model: User,
        attributes: ['user_name']
      }]
    });

    posts = posts.map(post => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/userposts/:id', async (req, res) => {
  try {
    const userPosts = await User.findAll(
      {}, {
      include: [{ model: Post }],
    });

    userPosts = userPosts.map((post) => post.get({ plain: true }));

    res.render('userPosts', { userPosts })

  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
