'use restrict';
import React from 'react';
import ReactDOM from 'react-dom';
var Item = require('./components/RoomListItem.jsx');
var ItemList = require('./components/item_list.jsx');


ReactDOM.render(
    <ItemList Item={Item}/>,
    document.getElementById('rooms')
);
