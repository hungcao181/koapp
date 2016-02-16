'use strict';
let React = require('react');
let url = '/rooms/';
let appActions = require('../actions/AppActions'); 

import {ButtonGroup, MenuItem, DropdownButton, Button, Image} from 'react-bootstrap/lib';

var Item = React.createClass({
    render: function () {
        
        return (
            <div className = "item room">
                <div>
                    <div className='row'> 
                        <a href={url.concat(this.props.item._id)}>
                            <Image src={this.props.item.image} alt="Product image" width="304" height="228" responsive></Image>
                            <h3>{this.props.item.title}</h3>                        
                        </a>
                    </div>
                </div>
                <div className='row'>
                    <ButtonGroup>
                        <Button bsStyle="info" onClick={this._onQuickView}>Quick view</Button>
                        <Button bsStyle="success" onClick={this._onAddToCart}>Add to cart</Button>
                    </ButtonGroup>
                </div>
            </div>
            );
    },
    _onQuickView: function (evt) {
        this.props.onQuickView(this.props.item);
    },
    _onAddToCart: function (evt) {
        this.props.onAddToCart(this.props.item);
    }
});

module.exports = Item;