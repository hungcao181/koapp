"use strict";
let monkdb      = require('../models/config').monkdb;
let wrap        = require('co-monk');
let parse       = require('co-body');
let mediaParse  = require('co-busboy');
let fs          = require('fs');
let path        = require('path');

let appRoot     = require('app-root-path');

let rooms = wrap(monkdb.get('rooms'));
let initRooms = require('./initData.js').initRooms;
let roomTpl = require('../views/room.marko');
let roomListTpl = require('../views/rooms.marko');
module.exports = {
    list: function *(next) {
        let data = {};
        data.rooms = yield rooms.find({});
        if (data.rooms.length == 0) {
            yield initRooms(); 
            data.rooms = yield rooms.find({});
        }
        this.body = data.rooms;
    },
    add: function *(next) {
        let body = yield parse.form(this);
        let room = {'title': body.title};
        room.description = body.description;
        room.image = body.image;
        room.MinimumAmount = body.MinimumAmount;
        room.price = body.price;

        yield rooms.insert(room);
        let data = {rooms: yield rooms.find({})};
        this.body = data.rooms;
    },
    addwithMedia: function *(next) {
        let parts = mediaParse(this, {
            autoFields: true
        });
        let part;
        let file = {};
        let files = [];
        let room = {};
        while (part = yield parts) {
            // it's a stream
            console.log('part:', part);
            // file = appRoot + '/public/images/' + part.filename;
            let newfile = appRoot + '/public/images/' + part.filename;
            file.path = '/images/' + part.filename;
            file.name = part.fieldname;
            files.push(file);
            part.pipe(fs.createWriteStream(newfile));
        }
        console.log('and we are done parsing the form!');
        // .field holds all the fields in key/value form
        // console.log('fields ', parts.fields);
        files.forEach(function (file) {
            room[file.name] = file.path;
        });
        parts.fields.forEach(function (f) {
            // console.log(f[0], '-',f[1] );
            room[f[0]] = f[1];
        });
        // room = {'title': parts.fields['title']};
        // room.description = parts.fields['description'];
        // room.MinimumAmount = parts.fields['MinimumAmount'];
        // room.price = parts.fields['price'];
        yield rooms.insert(room);
        let data = {rooms: yield rooms.find({})};
        //this.body = data.rooms;
        roomListTpl.render(data, this.res);
        
                
    },
    show: function *(next) {
        let id = this.params.id;
        let data = yield rooms.findById(id);
        roomTpl.render(data, this.res);
        // this.body = data;
    },
    edit: function *(next) {
        this.body = {}
    },
    delete: function *(next) {
        let  id = this.params.id;
        console.log('id: ', this.params.id);
        yield rooms.remove({_id: id});
        let data = {rooms: yield rooms.find({})};
        this.body = data.rooms;
    }
}