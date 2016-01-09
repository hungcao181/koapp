"use strict";
let monkdb      = require('../models/config').monkdb;
let wrap        = require('co-monk');
let parse       = require('co-body');
let fs          = require('fs');

let rooms = wrap(monkdb.get('rooms'));
let initRooms = require('./initData.js').initRooms;

function getaRoom() {
    return {
    id: Date.now(),
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
        let room = getaRoom();
        yield rooms.insert(room);
        let data = {rooms: yield rooms.find({})};
        this.body = data.rooms;
    },
    show: function *(next) {
        this.body = {};
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