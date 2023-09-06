const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
// const bookRoutes = require('api/bookroutes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
