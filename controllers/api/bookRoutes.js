const router = require('express').Router();
const { User, Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get("/:title", async(req, res) =>{
    try{
        let title = req.params.title;
        title = title.replaceAll("\\s", "")
        const newBook = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}&key=AIzaSyCsZ-CQ-6sL4vI3AkO97A2SZ9W83Lqt_Kg`)
        .then(res => res.json())
        .then(data => {
            let bookTitle = data.items[0].volumeInfo.title;
            let bookAuthor = data.items[0].volumeInfo.authors;
            let bookCategories = data.items[0].volumeInfo.categories;
            let bookDescription = data.items[0].volumeInfo.description;
            let bookMaturity = data.items[0].volumeInfo.maturityRating;
            res.render('post', {
                bookTitle, bookAuthor, bookCategories, bookDescription, bookMaturity,
                logged_in: req.session.logged_in
            })
        })}
    catch (err){
        res.status(500).json(err);
    }
})

module.exports = router;