"use strict";
let monkdb      = require('../models/config').monkdb;
let wrap        = require('co-monk');
let co          = require('co');
let parse       = require('co-body');
let initData    = require('./initData.js');
let fs          = require('fs');
let comments = wrap(monkdb.get("comments"));
let initComments = require('./initData.js').initComments;
 
module.exports = {
    comments: function* (next) {
        let data = {};
        data.comments = yield comments.find({});
        if (data.comments.length ==0) { 
            yield initComments();
            data.comments = yield comments.find({});
        }
        this.body = data.comments;
    },
    postComment: function* (next) {
        let body = yield parse.form(this);
        let comment = {};
        comment.author = body.author;
        comment.text = body.text;
        comment.created_on = Date.now();
        comment.updated_on = Date.now();
        yield comments.insert(comment);
        let data = {comments: yield comments.find({})};
        this.body = data.comments;
    },
    editComment: function* (next) {
        let  id = this.params.id;
        let body = yield parse.form(this);
        let comment = {text:body.text};
        comment.updated_on = Date.now();
        yield comments.findAndModify({_id: id}, {$set: {text: comment.text, updated_on: comment.updated_on}})
        let data = {comments: yield comments.find({})};
        this.body = data;
    },
    delComment: function* (next) {
        let  id = this.params.id; //'567d14b2d8305acc2924e682';
        let comment = yield comments.remove({_id: id});
        this.body = {comment: comment};
        // this.body = {id: id, query: this.query, thisid: this.id, request: this.request, params: this.params};
    },
    showComment: function* (next) {
        let  id = this.params.id; //'567d14b2d8305acc2924e682';
        let rowsDeleted = yield comments.find({_id: id});
        this.body = {rowsDeleted: rowsDeleted};
        // this.body = {id: id, query: this.query, thisid: this.id, request: this.request, params: this.params};
    },
} 
