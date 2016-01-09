'use strict';
let React = require('react');
let Actions = require('./item-block-buttons');
let url = '/rooms/';
let appActions = require('../actions/AppActions'); 

import {ButtonGroup, MenuItem, DropdownButton, Button} from 'react-bootstrap/lib';

var Room = React.createClass({
    render: function () {
        
        return (
            <div className = "item room">
                <div>
                    <div className='row'> 
                        <a href={url.concat(this.props.item.id)}><h3>{this.props.item.title}</h3></a>
                        <img src={this.props.item.image} alt="The Pulpit Rock" width="304" height="228"></img>
                        <figcaption>Fig1. - A view of the pulpit rock in Norway.</figcaption>
                    </div>
                </div>
                <div className='row'>
                    <ButtonGroup>
                        <DropdownButton bsStyle="success" title="actions" id="callId">
                        <MenuItem id={this.props.item._id} onSelect={this._onDelete}>Delete</MenuItem>
                        <MenuItem id="2" onSelect={this._onAdd}>Add a Room</MenuItem>
                        </DropdownButton>
                        <Button bsStyle="info">Middle</Button>
                        <Button bsStyle="info">Right</Button>
                    </ButtonGroup>
                </div>
            </div>
            )
    },
    _onAdd: function () {
        appActions.addRoom({description: 'test'});
    },
    _onDelete: function (evt) {
        let id = evt.target.id;
        appActions.delRoom(id);
    }
});
module.exports = Room;