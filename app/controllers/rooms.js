"use strict";
let monkdb      = require('../models/config').monkdb;
let wrap        = require('co-monk');
let parse       = require('co-body');
let mediaParse  = require('co-busboy');
let fs          = require('fs');
let appRoot     = require('app-root-path');
let path        = require('path');
let imageDir        = require(path.join(appRoot + '/config/dir'));
// let imageDir    = require('/config/dir');

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
        let files = [];
        let room = {};
        while (part = yield parts) {
            // it's a stream
            console.log('part:', part);
            let file = {};
            file.path = path.join(imageDir.imageDir, part.filename);
            file.name = part.fieldname;
            files.push(file);
            part.pipe(fs.createWriteStream(path.join(imageDir.imageFullPath,part.filename)));
        }
        console.log('and we are done parsing the form!');
        // .field holds all the fields in key/value form
        files.forEach(function (file) {
            room[file.name] = file.path;
        });
        parts.fields.forEach(function (f) {
            room[f[0]] = f[1];
        });
        yield rooms.insert(room);
        let data = {rooms: yield rooms.find({})};
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