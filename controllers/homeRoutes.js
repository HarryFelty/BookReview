const router = require('express').Router();
const { Op } = require('sequelize');
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

router.get('/post/:id', async (req, res) => {

  try {
    const postData = await Post.findAll({
      where: { id: req.params.id }, include: [{
        model: Book
      }]
    })
    const posts = postData.map((post) => post.get({ plain: true }))
    console.log("POSTS", posts);
    // console.log(posts[0].book.title.trim());
    let trimmedTitle = posts[0].book.title.split(" ").join("")
    console.log(trimmedTitle)
    try {
      let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${trimmedTitle}&key=AIzaSyCsZ-CQ-6sL4vI3AkO97A2SZ9W83Lqt_Kg`)
      let data = await response.json()

      let bookInfo = {
        bookTitle: data.items[0].volumeInfo.title,
        bookAuthor: data.items[0].volumeInfo.authors,
        bookCategories: data.items[0].volumeInfo.categories,
        bookDescription: data.items[0].volumeInfo.description,
        bookMaturity: data.items[0].volumeInfo.maturityRating,
      }
      console.log(bookInfo)
      console.log(posts)
      res.render('post', {

        ...bookInfo,
        posts,
        logged_in: req.session.logged_in
      })
    }
    catch (error) {
      console.log(error)
    }

    // fetch(`/api/books/${trimmedTitle}`).then(res=> res.json()).then(data=> {
    //   console.log(data)
    // })
    // res.render("post", { posts });
  }
  catch (err) {
    res.status(500).json(err);
  }
})

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

router.get('/posts/:title', async (req, res) => {
  try {
    let bookPosts = await Post.findAll({
      include:
        [
          {model: User, 
          attributes: ["user_name"]},
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
