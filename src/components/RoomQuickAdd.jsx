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

    _saveAdd(evt) {
        evt.preventDefault();
        let form = evt.target.closest('form');
        var formData = new FormData(form);
        AppActions.addData(formData);
        form.reset();
    },
    _onSubmit(evt) {
        evt.preventDefault();
        var formData = new FormData(evt.target);
        console.log('formdata submitted ', formData);
        AppActions.addData(formData);
        this.setState({showModal: false}); 
    },
    _onInputsChange(evt) {
        evt.preventDefault();
        let f = evt.target;
        let data = this.state.data;
        if (f.getAttribute('name') == 'file') {
            data[f.getAttribute('name')] = fs.createReadStream(f.value);    
        }else {
            data[f.getAttribute('name')] = f.value;
        }
        this.setState({data: data});
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
                        <Input type="text" name='MinimumAmount' label="MinimumAmount" placeholder="Enter MinimumAmount" labelClassName="col-xs-2" wrapperClassName="col-xs-10"/>
                                    <ButtonInput type="submit" bsSize="lg" bsStyle="default" value="Save"></ButtonInput>
                                    <ButtonInput onClick={this._saveAdd} bsStyle="primary" bsSize="lg">Save +</ButtonInput>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
            </div>
        );
    }
});

module.exports = QuickAdd;