var router  = require('koa-router')();
var navigation = require('../controllers/navigation.js');

//navigations
router.get('/', navigation.home);
router.get('/about', navigation.about);
router.get('/profile', navigation.profile);
router.get('/karaoke', navigation.karaoke);

//comments
var comments = require('../controllers/comments.js');
router.get('/comments', comments.list);
router.post('/comments', comments.add);
router.get('/comments/:id', comments.show);
router.put('/comments/:id', comments.edit);
router.del('/comments/:id', comments.delete);

//rooms
var rooms = require('../controllers/rooms.js');
router.get('/rooms', rooms.list);
router.post('/rooms', rooms.addwithMedia);
router.get('/rooms/:id', rooms.show);
router.delete('/rooms/:id', rooms.delete);

//upload files
var media = require('../controllers/media.js');
router.post('/uploads', media.uploadImage);

module.exports = router;