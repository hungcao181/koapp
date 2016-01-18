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
    addData: function (data) {
        AppDispatcher.dispatch({
            type: ActionTypes.ADD_ROOM,
            data: data
        })
    },
    delRoom: function (id) {
        AppDispatcher.dispatch({
            type: ActionTypes.DEL_ROOM,
            data: {id: id}
        })
    },
    viewRoom: function (item) {
        AppDispatcher.dispatch({
            type: ActionTypes.QUICKVIEW,
            data: item
        })
    },
    OK200: function (response) {
        AppDispatcher.dispatch({
            type: ActionTypes.OK200,
            data: response
        })
    }
}

module.exports = AppActions;