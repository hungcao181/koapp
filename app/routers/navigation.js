"use strict";
require('marko/node-require').install();
let marko       = require('marko');
let homeTpl     = require('../views/home.marko');
let aboutTpl    = require('../views/about.marko');
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
        data.users = yield users.find({});
        aboutTpl.render(data, this.res);
    },
    initUsers: function* (next) {
        yield users.remove({});
        co(function *() {
            
            yield [
            users.insert({name: 'Admin', description: 'He can do everything'}),
            users.insert({name: 'Hung', description: 'He is owner. He can do everything'})
            ];
        });    
    }    
} 
