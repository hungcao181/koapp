"use strict";
require('marko/node-require').install();
let marko       = require('marko');
let homeTpl     = require('../views/home.marko');
let aboutTpl    = require('../views/about.marko');
let profileTpl  = require('../views/profile.marko');
let roomTpl     = require('../views/rooms.marko');
let monkdb      = require('../models/config').monkdb;
let wrap        = require('co-monk');
let co          = require('co');

let users = wrap(monkdb.get("users"));
let rooms = wrap(monkdb.get("rooms"));
let initRooms = require('./initData.js').initRooms;
let initUsers = require('./initData.js').initUsers;

module.exports = {
    home: function* (next) {
        homeTpl.render({
            name: 'Hung'
        }, this.res);
        // this.body = 'hello';
    },
    about: function* (next) {
        let data = {};
        data.users = yield users.find({});
        if (data.users.length ==0) { 
            yield initUsers();
        }
        aboutTpl.render(data, this.res);
    },
    profile: function* (next) {
        let data = {};
        profileTpl.render(data, this.res);
    },
    karaoke: function* (next) {
        let data = yield rooms.find({});
        if (data.length == 0) {
            yield initRooms();
        }
        roomTpl.render(data, this.res);
    }
} 
