const router = require('express').Router();
const { Post } = require('../../models');

router.get('/', async (req, res) => {
    let post = await Post.findAll();

    post = Post.map(posts => posts.get({ plain: true }));

    res.json(post);
})

router.post('/', async (req, res) => {
    let post = await Post.create(req.body);

    res.json(post);
});

router.put('/:id', async (req, res) => {
    let cars = await Post.update(
        {
            title: req.body.title,
            text: req.body.text
        },
        {
            where: {
                id: req.params.id
            }
        }
    );

});

router.delete('/:id', async (req, res) => {

    let result = await Post.destroy({ where: { id: req.params.id } });
    res.json(result);
})

module.exports = router;