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

module.exports = {
    home: function* (next) {
        homeTpl.render({
            name: 'Hung'
        }, this.res);
    },
    about: function* (next) {
        let data = {};
        data.users = yield users.find({name: 'Thao'});
        aboutTpl.render(data, this.res);
    },
    profile: function* (next) {
        let data = {};
        //data.users = yield users.find({name: 'Thao'});
        profileTpl.render(data, this.res);
    },
    rooms: function* (next) {
        let data = require('../models/mock-data.js');
        //data.users = yield users.find({name: 'Thao'});
        roomTpl.render(data, this.res);
    },
    initUsers: function* (next) {
        yield users.remove({});
        co(function *() {
            
            yield [
            users.insert({name: 'Admin', description: 'He can do everything'}),
            users.insert({name: 'Hung', description: 'He is owner. He can do everything'}),
            users.insert({name: 'Thao', description: 'She is owner of owner. She can do everything'})
            ];
        });    
    }    
} 
