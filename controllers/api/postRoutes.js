const router = require('express').Router();
const { Post } = require('../../models');

router.get('/', async (req, res) => {
    let posts = await Post.findAll();

    posts = posts.map(post => post.get({ plain: true }));

    res.json(posts);
})

router.post('/', async (req, res) => {
    let post = await Post.create(req.body);

    res.json(post);
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