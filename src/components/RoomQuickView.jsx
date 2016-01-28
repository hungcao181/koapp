var React = require('react');
var ReactDOM = require('react-dom');
let Modal = require('react-bootstrap/lib/Modal');
let Button = require('react-bootstrap/lib/Button');
let Popover = require('react-bootstrap/lib/Popover');
let Tooltip = require('react-bootstrap/lib/Tooltip');
let Image = require('react-bootstrap/lib/Image');
let Grid = require('react-bootstrap/lib/Grid');
let Row = require('react-bootstrap/lib/Row');
let Col = require('react-bootstrap/lib/Col');

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
                <Modal.Title>{data.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Grid>
                    <Row>
                        <Col xs={4} md={4}>
                            <Image src={data.image} alt='Product image' responsive></Image>
                            <figcaption>{data.title}</figcaption>
                        </Col>
                        <Col xs={6} md={6}>
                            <ul>
                                <li>{data.description}</li>
                                <li>price: {data.price}</li>
                                <li>Minimum: {data.MinimumAmount}</li>
                                <li>Status: {data.status}</li>
                                <li>Started: {data.startTime}</li>
                                <li>Ended: {data.endTime}</li>
                                <li>Duration: {data.duration}</li>
                            </ul>
                        </Col>            
                    </Row>
                    </Grid>
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