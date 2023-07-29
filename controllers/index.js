const router = require('express').Router();


const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const userGETRoutes = require('./userGET-routes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/user', userGETRoutes);

module.exports = router;