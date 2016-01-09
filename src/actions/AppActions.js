'use strict';
let AppDispatcher = require('../dispatcher/AppDispatcher');
let AppConstants = require('../constants/AppConstants');
let ActionTypes = require('../constants/AppConstants').ActionTypes;

let AppActions = {
    addItem: function (item) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.ADD_ITEM,
            item: item
        });
    },
    updateRooms: function () {
        AppDispatcher.dispatch({
            type: ActionTypes.UPDATE_ROOM
        })
    },
    addRoom: function (room) {
        AppDispatcher.dispatch({
            type: ActionTypes.ADD_ROOM,
            data: room
        })
    },
    delRoom: function (id) {
        AppDispatcher.dispatch({
            type: ActionTypes.DEL_ROOM,
            data: {id: id}
        })
    }
}

module.exports = AppActions;