'use strict';
let co = require('co');
let coRequest = require('co-request');
let request = require('request');
let EventEmitter = require('events').EventEmitter;
let assign = require('object-assign');
let ActionTypes = require('../constants/AppConstants').ActionTypes;
let AppDispatcher = require('../dispatcher/AppDispatcher');
let CHANGE_EVENT = 'change';
let OK200_EVENT = 'quick_view'; 
let endPoint = '/rooms';

let _rooms = {};
let options = {
    url: window.location.origin + endPoint,
    method: 'get'
};

let roomStore = assign({}, EventEmitter.prototype, {
    loadDataFromServer: function () {
        co(function *() {
            let response = yield coRequest(options);
            _rooms = JSON.parse(response.body);
            console.log('loading data from server:', _rooms);
            this.emitChange();
        }.bind(this)).catch(function (err) {
                console.log('err: ', err);
        });    
    },
    storeData: function (data) {
        // co(function *() {
        //     let response = yield coRequest({
        //         url: options.url,
        //         formData: data,
        //         method: 'post',
        //         headers: {
        //             'Accept': 'application/json'
        //         },
        //         processData: false,
        //         contentType: false
        //     });
        //     _rooms = JSON.parse(response.body);
        //     this.emitChange();
        // }.bind(this)).catch(function (err) {
        //         console.log('err: ', err);
        // });    
        $.ajax({
            url: options.url,
            type: 'post',
            data: data,
            headers: {
                'Accept': 'application/json'
            },
            processData: false,
            contentType: false
        }).done(function (body) {
            _rooms = JSON.parse(JSON.stringify(body));
            this.emitChange();
        }.bind(this))
        .fail(function (err) {
            console.log('error! ', err);
        });
    },
    onError: function (error) {
        console.log(error);
    },
    deleteData: function (id) {
        request.del(options.url.concat('/', id), function (err, res, body) {
            _rooms = JSON.parse(body);
            this.emitChange();
        }.bind(this))
    },
    emitOK200: function () {
        this.emit(OK200_EVENT);
    },
    emitChange: function () {
        console.log('emitting change');
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    addOK200Listener: function (callback) {
        this.on(OK200_EVENT, callback);
    },
    removeOK200Listener: function (callback) {
        this.removeListener(OK200_EVENT, callback);
    }, 
    getAll: function () {
        return _rooms;
    }
});

roomStore.dispatchToken = AppDispatcher.register(function (action) {
    let id = (action.data && action.data.id) ? action.data.id : null;
    switch (action.type) {
        case ActionTypes.ADD_ROOM:
            roomStore.storeData(action.data);
            break;
        case ActionTypes.UPDATE_ROOM:
            roomStore.emitChange();
        case ActionTypes.DEL_ROOM:
            if (id) {
                roomStore.deleteData(id);
            }
        case ActionTypes.OK200:
            roomStore.emitOK200();
        default:
        //nothing
    }
}) 
module.exports = roomStore;