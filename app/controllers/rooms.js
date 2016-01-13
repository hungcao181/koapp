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
function getaRoom() {
    return {
    title: 'Fresh fruits package',
    description: 'sound surrounding 4D',
    image: 'images/vip01.jpg',
    MinimumAmount: 20,
    price: 50,
    status: 'using',
    startTime: '',
    endTime: '',
    duration: 0 
    }
}
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
        var parts = mediaParse(this, {
            autoFields: true
        });
        var part;
        var file, relFile;
        var files = {};
        let room;
        while (part = yield parts) {
            // it's a stream
            console.log('part:', part);
            // file = appRoot + '/public/images/' + part.filename;
            file = appRoot + '/public/images/' + part.filename;
            relFile = '/images/' + part.filename;
            files[part.fieldname] = relFile;
            console.log('file ', file);
            part.pipe(fs.createWriteStream(file));
        }
        console.log('and we are done parsing the form!');
        // .field holds all the fields in key/value form
        // console.log(parts.field._csrf)
        // .fields holds all the fields in [key, value] form
        // console.log(parts.fields[0])
        room = {'title': parts.fields['title']};
        room.description = parts.fields['description'];
        room.MinimumAmount = parts.fields['MinimumAmount'];
        room.price = parts.fields['price'];
        room['image'] = relFile;
        // files.forEach(function (file) {
        //     console.log('file');
        // });
        yield rooms.insert(room);
        let data = {rooms: yield rooms.find({})};
        this.body = data.rooms;
                
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