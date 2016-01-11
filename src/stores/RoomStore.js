'use strict';
let co = require('co');
let coRequest = require('co-request');
let request = require('request');
let EventEmitter = require('events').EventEmitter;
let assign = require('object-assign');
let ActionTypes = require('../constants/AppConstants').ActionTypes;
let AppDispatcher = require('../dispatcher/AppDispatcher');
let CHANGE_EVENT = 'change';
let QUICKVIEW_EVENT = 'quick_view'; 
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
    storeData: function () {
        request.post({
            url: options.url,
            form: {
                description: 'test'
            }
        }, function (err, res, body) {
            _rooms = JSON.parse(body);
            console.log('loading data from server:', _rooms);
            this.emitChange();
        }.bind(this))
    },
    deleteData: function (id) {
        request.del(options.url.concat('/', id), function (err, res, body) {
            _rooms = JSON.parse(body);
            this.emitChange();
        }.bind(this))
    },
    emitQuickView: function () {
        this.emit(QUICKVIEW_EVENT);
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
    addQuickViewListener: function (callback) {
        this.on(QUICKVIEW_EVENT, callback);
    },
    removeQuickViewListener: function (callback) {
        this.removeListener(QUICKVIEW_EVENT, callback);
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
        case ActionTypes.QUICKVIEW:
            roomStore.emitQuickView();
        default:
        //nothing
    }
}) 
module.exports = roomStore;