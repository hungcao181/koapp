'use restrict';
var React = require('react');
var ReactDOM = require('react-dom');
var Image = require('react-bootstrap/lib/Image');
let Grid = require('react-bootstrap/lib/Grid');
let Row = require('react-bootstrap/lib/Row');
let Col = require('react-bootstrap/lib/Col');
let Input = require('react-bootstrap/lib/Input');
let ButtonInput = require('react-bootstrap/lib/ButtonInput');
let Button = require('react-bootstrap/lib/Button');
let ButtonGroup = require('react-bootstrap/lib/ButtonGroup');

var AppActions = require('../actions/AppActions');
var RoomStore = require('../stores/RoomStore');
var QuickView = require('./RoomQuickView');
var QuickAdd = require('./RoomQuickAdd');

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
        RoomStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        RoomStore.removeChangeListener(this._onChange);
    },
    _onChange: function () {
        let data = RoomStore.getAll();
        this.setState({data: data});
    },
    _onQuickView: function (item) {
        let actionsNode = document.getElementById('actions-section');
        ReactDOM.unmountComponentAtNode(actionsNode);
        ReactDOM.render(<QuickView data={item}/>, document.getElementById('actions-section'));        
    },
    _onAdd: function () {
        let actionsNode = document.getElementById('actions-section');
        ReactDOM.unmountComponentAtNode(actionsNode);
        ReactDOM.render(<QuickAdd/>, document.getElementById('actions-section'));
        RoomStore.addOK200Listener(this._onOK200);
    },
    _onOK200: function () {
        let actionsNode = document.getElementById('actions-section');
        ReactDOM.unmountComponentAtNode(actionsNode);
        RoomStore.removeOK200Listener(this._onOK200);
        console.log('OK200');
    },
    render: function () {
        data = this.state.data;
        let onQuickViewFn = this._onQuickView;
        var ItemNodes = data.map(function(item) {    
            return (
                <Room  key={item._id} item={item} onQuickView={onQuickViewFn}>
                </Room>
            )
        });
        
        return (
            <div className = "items rooms">
                <ButtonGroup>
                    <ButtonInput onClick={this._onAdd}>Add</ButtonInput>
                </ButtonGroup>
                {ItemNodes}
            </div>
        );        
    }
});



module.exports = ItemList;