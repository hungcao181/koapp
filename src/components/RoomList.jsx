'use restrict';
var React = require('react');
var ReactDOM = require('react-dom');

var AppActions = require('../actions/AppActions');
var RoomStore = require('../stores/RoomStore');
var QuickView = require('./RoomQuickView');

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
        RoomStore.addQuickViewListener(this._onQuickView);
    },
    componentWillUnmount: function () {
        RoomStore.removeChangeListener(this._onChange);
    },
    _onChange: function () {
        let data = RoomStore.getAll();
        console.log('data on change', data);
        this.setState({data: data});
    },
    _onQuickView: function (item) {
        let notificationNode = document.getElementById('notification-section');
        ReactDOM.unmountComponentAtNode(notificationNode);
        ReactDOM.render(<QuickView data={item}/>, document.getElementById('notification-section'));        
    },
    render: function () {
        data = this.state.data;
        let onQuickViewFn = this._onQuickView;
        var ItemNodes = data.map(function(item) {    
            return (
                <Room  key={item.id} item={item} onQuickView={onQuickViewFn}>
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