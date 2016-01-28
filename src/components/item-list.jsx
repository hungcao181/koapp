'use restrict';
var React = require('react');
var ReactDOM = require('react-dom');
let Image = require('react-bootstrap/lib/Image');
let Grid = require('react-bootstrap/lib/Grid');
let Row = require('react-bootstrap/lib/Row');
let Col = require('react-bootstrap/lib/Col');
let Input = require('react-bootstrap/lib/Input');
let ButtonInput = require('react-bootstrap/lib/ButtonInput');
let Button = require('react-bootstrap/lib/Button');
let ButtonGroup = require('react-bootstrap/lib/ButtonGroup');

var QuickView = require('./RoomQuickView');
var QuickAdd = require('./RoomQuickAdd');

var endPoint = '/rooms';

let co = require('co');
let coRequest = require('co-request');
let data, store;

let options = {
    url: window.location.origin + endPoint,
    method: 'get'
};

var ItemList = React.createClass({
    getInitialState: function () {
        store = this.props.store;
        store.loadDataFromServer();
        return {data: []};
    },
    componentDidMount: function () {
        store.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        store.removeChangeListener(this._onChange);
    },
    _onChange: function () {
        let data = store.getAll();
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
        store.addOK200Listener(this._onOK200);
    },
    _onOK200: function () {
        let actionsNode = document.getElementById('actions-section');
        ReactDOM.unmountComponentAtNode(actionsNode);
        store.removeOK200Listener(this._onOK200);
        console.log('OK200');
    },
    render: function () {
        data = this.state.data;
        let ItemComp = this.props.ItemComp;
        let onQuickViewFn = this._onQuickView;
        var ItemNodes = data.map(function(item) {    
            return (
                <ItemComp  key={item._id} item={item} onQuickView={onQuickViewFn}>
                </ItemComp>
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