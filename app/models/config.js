//Mangage mongodb process https://docs.mongodb.org/v3.0/tutorial/install-mongodb-on-windows/
"use strict";
var monkdb      = require('monk')('localhost/koapp');

module.exports = {
    monkdb: monkdb    
}