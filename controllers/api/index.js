const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const bookRoutes = require('./bookRoutes');

router.use('/users', userRoutes);
router.use('/books', bookRoutes);
router.use('/post', postRoutes);

module.exports = router;
