const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

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
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['user_name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));
    console.log(users)
    res.render('homepage', {
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


module.exports = router;
