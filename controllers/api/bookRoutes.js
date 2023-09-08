const router = require('express').Router();
const { User, Post, Book } = require('../../models');
// const withAuth = require('../../utils/auth');



router.get("/:title", async (req, res) => {
    try {
        let title = req.params.title;
        // title = title.replaceAll("\\s", "")
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}&key=AIzaSyCsZ-CQ-6sL4vI3AkO97A2SZ9W83Lqt_Kg`)
            .then(res => res.json())
            .then(data => {
                let bookInfo ={
                bookTitle: data.items[0].volumeInfo.title,
                bookAuthor: data.items[0].volumeInfo.authors,
                bookCategories: data.items[0].volumeInfo.categories,
                bookDescription: data.items[0].volumeInfo.description,
                bookMaturity: data.items[0].volumeInfo.maturityRating,
                }
                return bookInfo
                // res.render('post', {
                //     bookTitle, bookAuthor, bookCategories, bookDescription, bookMaturity,
                //     logged_in: req.session.logged_in
                // })
            })
    }
    catch (err) {
        res.status(500).json(err);
    }
})

router.post("/:title", async (req, res) => {
    try {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}&key=AIzaSyCsZ-CQ-6sL4vI3AkO97A2SZ9W83Lqt_Kg`)
            .then(res => res.json())
            .then(data => {
               Book.create(
                    {
                        title: data.items[0].volumeInfo.title,
                        bookAuthor: data.items[0].volumeInfo.authors,
                        bookCategories: data.items[0].volumeInfo.categories,
                        bookDescription: data.items[0].volumeInfo.description,
                        bookMaturity: data.items[0].volumeInfo.maturityRating,
                    }
                )
            })
            res.status(200).json(data);
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router;