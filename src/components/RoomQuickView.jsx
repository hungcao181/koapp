var React = require('react');
var ReactDOM = require('react-dom');
let Modal = require('react-bootstrap/lib/Modal');
let Button = require('react-bootstrap/lib/Button');
let Popover = require('react-bootstrap/lib/Popover');
let Tooltip = require('react-bootstrap/lib/Tooltip');
let OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');

var QuickView = React.createClass({
    getInitialState() {
        return { showModal: true };
    },

    close() {
        this.setState({ showModal: false });
    },

    open() {
        this.setState({ showModal: true });
    },

    render() {
        let popover = <Popover title="popover">very popover. such engagement</Popover>;
        let tooltip = <Tooltip>wow.</Tooltip>;
        let data = this.props.data;
        return (
            <div>
            <p>Click to get the full Modal experience!</p>

            <Button
                bsStyle="primary"
                bsSize="large"
                onClick={this.open}
                className = 'hidden'
            >
                Launch demo modal
            </Button>

            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-md-4'>
                            <img src={data.image} alt={data.title} width="304" height="228"></img>
                            <figcaption>{data.title}</figcaption>
                        </div>
                        <div className='col-md-8'>
                            <ul>
                                <li>{data.description}</li>
                                <li>price: {data.price}</li>
                                <li>Minimum: {data.MinimumAmount}</li>
                                <li>Status: {data.status}</li>
                                <li>Started: {data.startTime}</li>
                                <li>Ended: {data.endTime}</li>
                                <li>Duration: {data.duration}</li>
                            </ul>
                        </div>            
                    </div>
                    <div className='row'>
                        <div className='col-md-4'>
                        Comments
                        </div>
                        <div className='col-md-8'>
                        </div>            
                    </div>        

                </Modal.Body>
                <Modal.Footer>
                <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
            </Modal>
            </div>
        );
    }
});
module.exports = QuickView;