var router  = require('koa-router')();
var navigation = require('./navigation.js');
router.get('/', navigation.home);
router.get('/about', navigation.about);
router.get('/initusers', navigation.initUsers);

module.exports = router;