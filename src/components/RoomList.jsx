"use restrict";
var React = require('react');

var AppActions = require('../actions/AppActions');
// var AppStore = require('../stores/AppStore');

var RoomStore = require('../stores/RoomStore');

var endPoint = '/rooms';
var Room = require('./RoomListItem.jsx');

let co = require('co');
let coRequest = require('co-request');
let data;

let options = {
    url: window.location.origin + endPoint,
    method: 'get'
};

var ItemList = React.createClass({
    getInitialState: function () {
        RoomStore.loadDataFromServer();
        return {data: []};
    },
    componentDidMount: function () {
        // this.loadDataFromServer();
        RoomStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        RoomStore.removeChangeListener(this._onChange);
    },
    _onChange: function () {
        let data = RoomStore.getAll();
        console.log('data on change', data);
        this.setState({data: data});
    },
    render: function () {
        data = this.state.data;
        var ItemNodes = data.map(function(item) {    
            return (
                <Room  key={item.id} item={item}>
                </Room>
            )
        });
        return (
            <div className = "items rooms">
                {ItemNodes}
            </div>
        );        
    }
});

module.exports = ItemList;