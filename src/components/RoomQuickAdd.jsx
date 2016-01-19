'use strict';
let fs = require('fs');
var React = require('react');
var ReactDOM = require('react-dom');
let Modal = require('react-bootstrap/lib/Modal');
let Popover = require('react-bootstrap/lib/Popover');
let Tooltip = require('react-bootstrap/lib/Tooltip');
let Image = require('react-bootstrap/lib/Image');
// let Grid = require('react-bootstrap/lib/Grid');
let Row = require('react-bootstrap/lib/Row');
let Col = require('react-bootstrap/lib/Col');
let Input = require('react-bootstrap/lib/Input');
let ButtonInput = require('react-bootstrap/lib/ButtonInput');
let Button = require('react-bootstrap/lib/Button');
let ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
let OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');

var AppActions = require('../actions/AppActions');

var QuickAdd = React.createClass({
    getInitialState() {
        return { showModal: true, data: {} };
    },

    close() {
        this.setState({ showModal: false });
    },

    open() {
        this.setState({ showModal: true });
    },

    _onSaveAdd(evt) {
        // evt.preventDefault();
        // let form = evt.target.closest('form');
        evt.preventDefault();
        let form = document.getElementById('RoomQuickAdd');
        var formData = new FormData(form);
        AppActions.addData(formData);
        form.reset();
    },
    _onSave(evt) {
        evt.preventDefault();
        var form = document.getElementById('RoomQuickAdd');
        var formData = new FormData(form);
        AppActions.addData(formData);
        this.setState({showModal: false}); 
    },
    _onSubmit(evt) {
        evt.preventDefault();
        var formData = new FormData(evt.target);
        AppActions.addData(formData);
        this.setState({showModal: false}); 
    },
    render() {
        let data = this.props.data;
        return (
            <div>
            <p>Click to get the full Modal experience!</p>

            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Adding room info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id='RoomQuickAdd' name='roomInfo' encType='multipart/form-data' method='post' onSubmit={this._onSubmit} className='form-horizontal'>
                        <Input type="text" name='title' label="Title" placeholder="Enter title" labelClassName="col-xs-2" wrapperClassName="col-xs-10"/>
                        <Input type="file" name='image' label="File" help="[Optional] Block level help text" labelClassName="col-xs-2" wrapperClassName="col-xs-10"/>
                        <Input type="textarea" name='description' label="Description" placeholder="Enter description" labelClassName="col-xs-2" wrapperClassName="col-xs-10"/>
                        <Input type="text" name='price' label="Price" placeholder="Enter price" labelClassName="col-xs-2" wrapperClassName="col-xs-10"/>
                        <Input type="text" name='Min Amount' label="MinimumAmount" placeholder="Enter MinimumAmount" labelClassName="col-xs-2" wrapperClassName="col-xs-10"/>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonToolbar className='pull-right'>
                        <Button onClick={this._onSave} bsStyle="default">Save</Button>
                        <Button onClick={this._onSaveAdd} bsStyle="primary">Save +</Button>
                    </ButtonToolbar>
                </Modal.Footer>
            </Modal>
            </div>
        );
    }
});

module.exports = QuickAdd;