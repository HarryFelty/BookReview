const router = require('express').Router();
const { User, Post, Book } = require('../../models');
// const withAuth = require('../../utils/auth');

router.post("/:title", async (req, res) => {
    try {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${req.params.title}&key=AIzaSyCsZ-CQ-6sL4vI3AkO97A2SZ9W83Lqt_Kg`)
            .then(res => res.json())
            .then(data => {
                console.log(data.items[0].volumeInfo.authors[0]);
                Book.create(
                    {

                        title: data.items[0].volumeInfo.title,
                        author: data.items[0].volumeInfo.authors[0],
                        category: data.items[0].volumeInfo.categories[0],
                        description: data.items[0].volumeInfo.description,
                        age_rating: data.items[0].volumeInfo.maturityRating,
                        page_count: data.items[0].volumeInfo.pageCount,
                        publication_date: data.items[0].volumeInfo.publishedDate
                    }
                )
                res.status(200).json(data);
            })
        
    }
    catch (err) {
        // console.log(err)
        res.status(500).json(err)
    }
})

router.get("/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let getBook = await Book.findByPk(id);
        if(getBook === null){
            res.status(500).json("book not found");
        }
        else{
            res.status(200).json(getBook);
        }
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