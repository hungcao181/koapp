"use strict";
require('marko/node-require').install();
let marko = require('marko');
let homeTpl = require('./home.marko');
let aboutTpl = require('./about.marko');

module.exports = {
    home: function* (next) {
        homeTpl.render({
            name: 'Hung'
        }, this.res);
    },
    about: function* (next) {
        aboutTpl.render({
            users: {}
        }, this.res);
    }    
} 
