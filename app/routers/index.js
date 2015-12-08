var router  = require('koa-router')();
var views = require('../views/index.js');
router.get('/', views.home);
router.get('/about', views.about);

module.exports = router;