var router  = require('koa-router')();
var navigation = require('./navigation.js');
router.get('/', navigation.home);
router.get('/about', navigation.about);
router.get('/profile', navigation.profile);
router.get('/initusers', navigation.initUsers);

module.exports = router;