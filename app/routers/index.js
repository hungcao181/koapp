'use strict';
let router  = require('koa-router')();
let navigation = require('../controllers/navigation.js');
function isAuth() {
    return function* (next) {
        console.log('-----', this.user , '---- ', this.state);
        if (this.state.user || this.user) {
            yield next;
        } else {
            this.throw(401, 'Must be logged in to see this!');
        }
    }
};
//navigations
router.get('/', navigation.home);
router.get('/about', navigation.about);
router.get('/profile', navigation.profile);
router.get('/karaoke', navigation.karaoke);
router.get('/login', navigation.login);
router.get('/logout', navigation.logout);
router.get('/signup', navigation.signup);
router.post('/authenticate', navigation.authenticate);
router.post('/register', navigation.register);
//comments
let comments = require('../controllers/comments.js');
router.get('/comments', comments.list);
router.post('/comments', comments.add);
router.get('/comments/:id', comments.show);
router.put('/comments/:id', comments.edit);
router.del('/comments/:id', comments.delete);

//rooms
let rooms = require('../controllers/rooms.js');
router.get('/rooms', rooms.list);
router.post('/rooms', rooms.addwithMedia);
router.get('/rooms/:id', rooms.show);
router.delete('/rooms/:id', rooms.delete);

//upload files (not used)
var media = require('../controllers/media.js');
router.post('/uploads', media.uploadImage);

module.exports = router;