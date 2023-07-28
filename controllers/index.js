const router = require('express').Router();

// const homeRoutes = require('./home-routes');
const apiRoutes = require('./api');

// router.get('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;