"use strict";
// http://www.marcusoft.net/2014/02/mnb-monk.html
// try this to uee generator with mocha, not try yet. 
    // https://labnotes.org/yield-to-the-test-using-mocha-with-es6-generators/
    // https://github.com/vdemedes/mocha-generators
    // https://github.com/blakeembrey/co-mocha
var should  = require('should');
var monk    = require('monk');

describe("monk connect to mongodb should work", function () {
    var db, stuff, rooms, anEmptyCollection = {};
    
    before( function (done) {
        db = monk('localhost/koapp');
        stuff = db.get("stuff");
        rooms = db.get("rooms");
        // rooms.remove({});
        anEmptyCollection = db.get("anEmptyCollection");
        done();
    });
    after(function (done) {
        done();
    });
    it("is easy to do", function (done) {
        stuff.insert({name: "stuff", description: "test stuff"}, function (err, doc) {
            if (err) console.log(err);
            should.exists(doc);
            done();
        });
    });
    it("is show this when collection is empty", function (done) {
        anEmptyCollection.find({}, function (err,docs) {
            if (err) console.log('err', err);
            should(docs.length).equal(0);
            done();
        });        
    });
    it("It should clear rooms", function (done) {
        rooms.find({}, function (err,docs) {
            if (err) console.log('err', err);
            console.log('length:', docs.length);
            should(docs.length).equal(0);
        });        
        done();
    });
});