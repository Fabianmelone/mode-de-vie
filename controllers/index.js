const router = require('express').Router();


const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const userGETRoutes = require('./userGET-routes');
const postGETRoutes = require('./postGet-routes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/user', userGETRoutes);
router.use('/posts', postGETRoutes);

module.exports = router;