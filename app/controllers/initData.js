"use strict";
let monkdb      = require('../models/config').monkdb;
let wrap        = require('co-monk');
let co          = require('co');

function *initComments(next) {
    let comments = wrap(monkdb.get('comments'));
    co(function *() {
        let data = require('../models/mockdata/comments.js');
        yield data.map(comment => {
            comments.insert(comment);
        });
    });    
};

function *initRooms(next) {
    let rooms = wrap(monkdb.get('rooms'));
    co(function *() {
        let data = require('../models/mockdata/rooms.js');
        yield data.map(room => {
            rooms.insert(room);
        });
    });    
};

function *initUsers(next) {
    let users = wrap(monkdb.get('users'));
    co(function *() {
        let data = require('../models/mockdata/users.js');
        yield data.map(room => {
            rooms.insert(users);
        });
    });    
};

module.exports = {
    initComments: initComments,
    initRooms: initRooms,
    initUsers: initUsers
    };