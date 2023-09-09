const router = require('express').Router();
const { Op } = require('sequelize');
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

      }
      ]
    });

    posts = posts.map(post => post.get({ plain: true }));


    console.log(posts);
    let dateFormatPost = posts.map((post) => ({ ...post, createdAt: new Date(post.createdAt).toLocaleString() }))
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

router.get('/post/:id', async (req, res) => {

  try {
    const postData = await Post.findAll({
      where: { id: req.params.id }, include: [{
        model: Book
      }]
    })
    const posts = postData.map((post) => post.get({ plain: true }))
      res.render('post', {
        posts,
        logged_in: req.session.logged_in
      })
    }
    catch (err) {
      res.status(500).json(err);
    }
  }
  
)

router.get('/login', (req, res) => {
  console.log(req.session)
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/userposts', async (req, res) => {
  try {

    let postData = await Post.findAll(
      {
        where: {
          user_id: req.session.user_id
        },
        include: [{ model: User }, { model: Book }]
      },
    );

    postData = postData.map((post) => post.get({ plain: true }));
    console.log(postData);
    res.render('userPosts', { postData })

  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
})

router.get('/posts/:title', async (req, res) => {
  try {
    let bookPosts = await Post.findAll({
      include:
        [
          {
            model: User,
            attributes: ["user_name"]
          },
          { model: Book }
        ],
      where: {
        '$book.title$': {
          [Op.like]: `%${req.params.title}%`
        }
      },


    })



    bookPosts = bookPosts.map((post) => post.get({ plain: true }))
    res.render('postList', { bookPosts });
  }
  catch (err) {
    res.status(500).json(err);
  }
})
module.exports = router;
