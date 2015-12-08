"use strict";
require('marko/node-require').install();
let marko = require('marko');
let template = require(__dirname + '/template.marko');

module.exports = function* (next) {
    template.render({
        name: 'Hung'
    }, this.res);
}