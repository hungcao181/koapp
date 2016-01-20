"use strict";
require('marko/node-require').install();
let marko       = require('marko');
let homeTpl     = require('../views/home.marko');
let aboutTpl    = require('../views/about.marko');
let profileTpl  = require('../views/profile.marko');
let roomsTpl    = require('../views/rooms.marko');
let loginTpl    = require('../views/login.marko');
let signupTpl    = require('../views/signup.marko');
let monkdb      = require('../models/config').monkdb;
let wrap        = require('co-monk');
let co          = require('co');
let parse       = require('co-body');

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
        roomsTpl.render(data, this.res);
    },
    login: function* (next) {
        loginTpl.render({}, this.res);
    },
    signup: function* (next) {
        signupTpl.render({}, this.res)
    },
    register: function* (next) {
        let body = yield parse.form(this);
        let newUser = {};
        let message = '';
        newUser.firstname = body.firstname;
        newUser.lastname = body.lastname;
        newUser.username = body.username;
        newUser.password = body.password;
        newUser.created_date = Date.now();
        newUser.updated_date = Date.now();
        let recs = yield users.find({'username': newUser.username});
        if (recs.length == 0) {
            yield users.insert(newUser);
            message = 'congratualation!';
        } else {
            message = 'User already exist';
        }        
        this.body = message;
    },
    authenticate: function* (next) {
        let body = yield parse.form(this);
        let user = {},
            message = '';
        user.username = body.username;
        user.password = body.password;
        let recs = yield users.find({'username': user.username, 'password': user.password});
        if (recs.length == 0) {
            message = 'Not found';
        } else {
            message = 'welcome back!'
        }
        this.body = message;
    }
} 
