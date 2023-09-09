const router = require('express').Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {
    try {
        let newPost = await Post.create(
            {
                title: req.body.title,
                text: req.body.text,
                user_id: req.body.user_id,
                book_id: req.body.book_id,
            })
        res.status(200).json(newPost);
    }
    catch (err) {
        res.status(500).json(err)
    }
});

router.put('/:id', async (req, res) => {
    try {
        let post = await Post.update(
            {
                title: req.body.title,
                text: req.body.text
            },
            {
                where: {
                    id: req.params.id
                }
            },

        );
        res.status(200).json(post)
    }
    catch (err) {
        res.status(500).json(err)
    }

});

router.delete('/:id', async (req, res) => {

    let result = await Post.destroy({ where: { id: req.params.id } });
    res.json(result);
})

module.exports = router;
