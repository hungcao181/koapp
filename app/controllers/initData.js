"use strict";
function *initComments(next) {
    co(function *() {
        let data = require('../models/mockdata/comments.js');
        yield data.map(comment => {
            comments.insert(comment);
        });
    });    
};

function *initRooms(next) {
    co(function *() {
        let data = require('../models/mockdata/rooms.js');
        yield data.map(room => {
            rooms.insert(room);
        });
    });    
};

function *initUsers(next) {
    co(function *() {
        let data = require('../models/mockdata/rooms.js');
        yield data.map(room => {
            rooms.insert(room);
        });
    });    
};

module.exports = {
    initComments: initComments,
    initRooms: initRooms,
    initUsers: initUsers
    };