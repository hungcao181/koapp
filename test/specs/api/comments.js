"use strict";
var should  = require('should');
var request = require('request');

describe("API to work with comments", function () {

    before( function (done) {
        done();
    });
    after(function (done) {
        done();
    });
    it("is should update comment", function (done) {
        request
        .get('http://localhost:3000/api/comments/567d14b2d8305acc2924e682')
        .on('response', function(response) {
            console.log(response.body);
            done();
            should(response.statusCode).equal(200);
        })
        .on('error', function(error) {
            console.log('error', error);
            done(error);
        })        
    });
});