var router  = require('koa-router')();
var navigation = require('../controllers/navigation.js');
var api = require('../controllers/api.js');

router.get('/', navigation.home);
router.get('/about', navigation.about);
router.get('/profile', navigation.profile);
router.get('/initusers', navigation.initUsers);
router.get('/initrooms', navigation.initRooms);
router.get('/rooms', navigation.rooms);

router.get('/api/comments', api.comments);
router.post('/api/comments', api.postComment);
router.get('/api/comments/:id', api.showComment);
router.put('/api/comments/:id', api.editComment);
router.del('/api/comments/:id', api.delComment);
module.exports = router;