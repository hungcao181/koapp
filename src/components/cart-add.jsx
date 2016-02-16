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

var CartItem = React.createClass({
    remove() {
        Lockr.srem('cart', this.props.data);
        //sound like the srem above does not work 
        console.log('cart: ',Lockr.smembers('cart'));
        this.props.removeFn();
    },
    render() {
        let item = this.props.data;
        return (                    
            <Row id={item._id}>
                <Col xs={1} md={1}>
                    <Image src={item.image} alt='Product image' responsive></Image>
                </Col>
                <Col xs={2} md={2}>
                    {item.title}
                </Col>
                <Col xs={2} md={2}>
                    {item.description}
                </Col>
                    <Col xs={1} md={1}>
                {item.price}
                </Col>
                <Col xs={6} md={6}>
                    <Button onClick={this.remove}>
                        Remove {item._id}
                    </Button>
                </Col>            
            </Row>
        );
    }
});

var CartAdd = React.createClass({
    getInitialState() {
        return { showModal: true, data: this.props.data };
    },
    close() {
        this.setState({ showModal: false });
    },
    open() {
        this.setState({ showModal: true });
    },
    remove() {
        console.log('removing');
        this.setState({ showModal: true, data: Lockr.smembers('cart')});
    },
    render() {
        // let data = this.props.data;
        let rows = [];
        let that=this;
        this.state.data.forEach(function(item) {
            rows.push(
                <CartItem data={item} removeFn={that.remove}/>
            );
        });
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
                <Modal.Title>{this.state.data.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Grid>
                    {rows}
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
module.exports = CartAdd;