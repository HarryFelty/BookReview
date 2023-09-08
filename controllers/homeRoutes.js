const router = require('express').Router();
const { where } = require('sequelize');
const { User, Post, Book } = require('../models');
const withAuth = require('../utils/auth');



// router.get('/', withAuth, async (req, res) => {
//   try {
//     const userData = await User.findAll({
//       attributes: { exclude: ['password'] },
//       order: [['user_name', 'ASC']],
//     });

//     const users = userData.map((project) => project.get({ plain: true }));
//     let posts = await Post.findAll({
//       include: [{
//         model: User,
//         attributes: ['user_name']
//       },
//       {
//         model: Book
//       }]
//     });
//   }
// } catch (err))

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


    // posts = posts.map(post => post.get({ plain: true }));
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

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/userposts', async (req, res) => {
  try {
    // let userPosts = await User.findAll(
    //   {
    //     where: {
    //       id: req.session.user_id
    //     },
    //   },
    // );

    let postData = await Post.findAll(
      {
        where: {
          user_id: req.session.user_id
        },
        include: [{ model: User }, { model: Book }]
      },
    );

    // userPosts =userData[0].get({ plain: true }));
    postData = postData.map((post) => post.get({ plain: true }));
    // console.log(userPosts, postData);
    console.log(postData);

    // res.render('userPosts', { userPosts, postData })
    res.render('userPosts', { postData })
    // res.json(userPosts);

  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
})

module.exports = router;
