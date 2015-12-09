"use strict";
require('marko/node-require').install();
let marko = require('marko');
let homeTpl = require('../views/home.marko');
let aboutTpl = require('../views/about.marko');
let monkdb = require('../models/config').monkdb;
module.exports = {
    home: function* (next) {
        homeTpl.render({
            name: 'Hung'
        }, this.res);
    },
    about: function* (next) {
        var users = monkdb.get("users");
        console.log(users); 
        aboutTpl.render({
            users: users
        }, this.res);
    }    
} 
