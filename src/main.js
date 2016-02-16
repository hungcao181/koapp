'use restrict';
import React from 'react';
import ReactDOM from 'react-dom';
var Room = require('./components/RoomListItem');
var Item = require('./components/Item');
var ItemList = require('./components/item-list');
// var RoomList = require('./components/RoomList');
var RoomStore = require('./stores/RoomStore');

import ProductData from './product-data';
import CartAPI from './utils/cart-api';

// Load Mock Product Data into localStorage
ProductData.init();

// Load Mock API Call
CartAPI.getProductData();

ReactDOM.render(
    <ItemList ItemComp={Item} store={RoomStore}/>,
    document.getElementById('rooms')
);

