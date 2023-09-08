const router = require('express').Router();
const { where } = require('sequelize');
const { User, Post, Book } = require('../models');
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
      },
      {
        model: Book
      }]
    });


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


    posts = posts.map(post => post.get({ plain: true }));
    console.log(posts);
let dateFormatPost = posts.map((post)=> ({...post, createdAt: new Date(post.createdAt).toLocaleString()}))
console.log(dateFormatPost)
    res.render('homepage', {
      posts,

      dateFormatPost,

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

router.get('/userposts', async (req, res) => {
  try {
    const userPosts = await User.findByPk(id, {
      include: [{ model: Post }],
    });

    userPosts = userPosts.map((post) => post.get({ plain: true }));

    res.render('userPosts', { userPosts })

  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
