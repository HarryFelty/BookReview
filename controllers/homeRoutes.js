const router = require('express').Router();
const { where } = require('sequelize');
const { User, Post, Book } = require('../models');
const withAuth = require('../utils/auth');

<<<<<<< HEAD
// router.get('/', async (req, res) => {
//   try {
//     let posts = await Post.findAll({
//       include: [{
//         model: User,
//         attributes: ['user_name']
//       }]
//     });

//     posts = posts.map(post => post.get({ plain: true }));
//     console.log(posts);
//     res.render('homepage', { posts });
//   } catch {
//     res.status(500).json(err)
//   }
// })




router.get('/', async (req, res) => {
  try {
=======


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
>>>>>>> 8d3df2d462aeef8aa3fe46dec0e0211b0593b4f5
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['user_name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));
<<<<<<< HEAD
    console.log(users)
=======

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
>>>>>>> 8d3df2d462aeef8aa3fe46dec0e0211b0593b4f5
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

router.get('/post/:id', async (req, res) => {

  try {
    const postData = await Post.findAll({where: {id: req.params.id}})
    const posts = postData.map((post) => post.get({ plain: true }))
    console.log(posts);
    res.render("post", { posts });
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.get('/login', (req, res) => {
  console.log("hello")
  console.log(req.session)
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

<<<<<<< HEAD
=======
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
>>>>>>> 8d3df2d462aeef8aa3fe46dec0e0211b0593b4f5

module.exports = router;
