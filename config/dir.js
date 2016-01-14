'use strict';
let appRoot     = require('app-root-path');

let dir = {
    appRoot : appRoot,
    imageDir : '/images/',
    imageFullPath : appRoot + '/public/images/'
};
module.exports = dir;