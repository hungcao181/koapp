//http://www.marcusoft.net/2014/02/mnb-monk.html
var should  = require('should');
var monk    = require('monk');

describe("monk connect to mongodb should work", function () {
    var db, stuff = {};
    
    before( function (done) {
        db = monk('localhost/koapp');
        stuff = db.get("stuff");
        done();
    });
    after(function (done) {
        monk('localhost/koapp')
        .get("stuff")
        .drop(function (err) {
            if (err) return done(err);
        });
        done();
    });
    it("is easy to do", function (done) {
        stuff.insert({name: "stuff", description: "test stuff"}, function (err, doc) {
            if (err) return done(err);
            should.exists(doc);
            done();
        });
    });
});