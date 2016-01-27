'use restrict';
import React from 'react';
import ReactDOM from 'react-dom';
var Room = require('./components/RoomListItem');
var ItemList = require('./components/item-list');
var RoomList = require('./components/RoomList');
var RoomStore = require('./stores/RoomStore');
ReactDOM.render(
    <ItemList ItemComp={Room} store={RoomStore}/>,
    document.getElementById('rooms')
);
