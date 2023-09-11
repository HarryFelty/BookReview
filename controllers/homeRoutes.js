const router = require('express').Router();
const { Op } = require('sequelize');
const { User, Post, Book } = require('../models');
const withAuth = require('../utils/auth');


//renders homepage when a user is logged in
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

//gets a post by id, used when clicking on a specific post
router.get('/post/:id', async (req, res) => {
  console.log(req.params.id)
  try {
    const postData = await Post.findAll({
      where: { id: req.params.id },
      include: [{
        model: Book,
        // where: book_id
      }]
    })
    const posts = postData.map((post) => post.get({ plain: true }))
    console.log(posts);
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

//logs in a user
router.get('/login', (req, res) => {
  console.log(req.session)
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

//routes users through the create post process
router.get("/createPost", async (req, res) => {
  try {
    res.render('createBook');
  }
  catch (err) {
    res.status(500).json(err);
  }
})

//gets a user's posts and renders them on users posts
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

    res.render('userPosts', { postData })

  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

//router for make post (unsure if we need this)
router.get('/makePost', async (req, res) => {
  try {
    let makePost = await User.findByPk(req.session.user_id, {
      include: [{ model: Post, include: [{ model: Book }] }],
    });

    makePost = makePost.get({ plain: true });

    res.render('makePost', { makePost })

  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get('/post', async (req, res) => {
  try {

    await res.render('post')

  } catch (err) {
    console.log(err)
    res.status(500).json(err);

  }
});


router.get('/getPosts/:title', async (req, res) => {
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

//meant to get a book id from the title, and render the "createPost" page
router.get('/getBook/title/:title', async (req, res) => {
  try {
    let books = await Book.findAll({
      where: {
        title: {
          [Op.like]: `%${req.params.title}`
        }
      },
    })

    books = books.map((book) => book.get({ plain: true }))
    let bookID = books[0].id;
    console.log(books[0])
    res.render('createPost', { bookID });
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})
router.get('/getBook/id/:id', async (req, res) => {
  try {
    let books = await Book.findAll({
      where: {
        id: req.params.id
      },
    })

    books = books.map((book) => book.get({ plain: true }))
    let bookID = books[0].id;
    console.log(books[0])
    res.render('createPost', { bookID });
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})
