const router = require('express').Router();

const apiRoutes = require('./api');
const bookRoutes = require('api/bookroutes.js');

router.use('/', homeRoutes);
router.use('/post', apiRoutes);
router.use('/book', apiRoutes);
route.use('/user', userRoutes)

module.exports = router;
