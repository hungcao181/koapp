'use restrict';
import React from 'react';
import ReactDOM from 'react-dom';
// import {ItemList} from './components/RoomListItem.jsx';
var ItemList = require('./components/RoomList.jsx');

var roomData;
// roomData = require('./stores/data');

import co from 'co';
import coRequest from 'co-request';
import request from 'request';

let options = {
    url: 'http://localhost:3000/rooms',
    method: 'get'
};

var use = {request: false, coRequest: false};

if (use.request) {
    request(options, function (err, response, body) {
        roomData=JSON.parse(body);
        // console.log('body',roomData);
        ReactDOM.render(
            <ItemList data={roomData}/>,
            document.getElementById('rooms')
        );
    });
} else if (use.coRequest) {
    co(function* () {
        let response = yield coRequest(options);
        roomData = JSON.parse(response.body);    
        ReactDOM.render(
            <ItemList data={roomData}/>,
            document.getElementById('rooms')
        );
    }).catch(function (err) {
        console.log(err);
    });
} else {
    ReactDOM.render(
        <ItemList data={roomData}/>,
        document.getElementById('rooms')
    );
}