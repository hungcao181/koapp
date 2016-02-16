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
var CartAdd = require('./cart-add');
// import FluxCart from './flux-cart';
var products = 
      {
        id: '0011001',
        name: 'Scotch.io Signature Lager',
        image: 'scotch-beer.png',
        description: 'The finest lager money can buy. Hints of keyboard aerosol, with a whiff of iKlear wipes on the nose. If you pass out while drinking this beverage, Chris Sevilleja personally tucks you in.',
        variants: [
          {
            sku: '123123',
            type: '40oz Bottle',
            price: 4.99,
            inventory: 1

          },
          {
            sku: '123124',
            type: '6 Pack',
            price: 12.99,
            inventory: 5
          },
          {
            sku: '1231235',
            type: '30 Pack',
            price: 19.99,
            inventory: 3
          }
        ]
      };


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
    _onAddToCart: function (item) {
        let actionsNode = document.getElementById('actions-section');
        ReactDOM.unmountComponentAtNode(actionsNode);
        //code to add product to local cart data with default quanty, variants
        Lockr.sadd('cart',item);
        //end of add product to local cart data
         
        //show cart confirm component. make sure to have options to either update quanty, variants, proceed to buy or submit order
        let cart = Lockr.smembers('cart');
        ReactDOM.render(<CartAdd data={cart}/>, document.getElementById('actions-section'));
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
        let onAddToCartFn = this._onAddToCart;
        var ItemNodes = data.map(function(item) {    
            return (
                <ItemComp  key={item._id} item={item} onQuickView={onQuickViewFn} onAddToCart={onAddToCartFn}>
                </ItemComp>
            );
        });
        
        return (
            <div className = "items rooms">
                {ItemNodes}
            </div>
        );        
    }
});

document.getElementById("viewCart").onclick = function () {
    console.log('master, I am here');
    let actionsNode = document.getElementById('actions-section');
    ReactDOM.unmountComponentAtNode(actionsNode);
    let cart = Lockr.smembers('cart');
    ReactDOM.render(<CartAdd data={cart}/>, document.getElementById('actions-section'));
    return false;
};

module.exports = ItemList;