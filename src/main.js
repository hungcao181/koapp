// import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import {ItemList as Rooms} from './components/rooms.jsx';
// import {CommentBox, CommentList, Comment} from './components/comments.jsx';
var CommentBox = require('./components/comments.jsx');
var ItemList = require('./components/rooms.jsx');
import {ButtonGroup, MenuItem, DropdownButton, Button} from 'react-bootstrap/lib';

ReactDOM.render(
    <ItemList/>,
    document.getElementById('rooms')
);

ReactDOM.render(
//   <CommentBox data={comments} />,
    <CommentBox url='/api/comments'  pollInterval={20000}/>,
    document.getElementById('comments')
);

function onSelectAlert(eventKey, href) {
    alert('Alert from menu item.\neventKey: "' + eventKey + '"\nhref: "' + href + '"');
}

var buttonGroupInstance = (
  <ButtonGroup>
    <DropdownButton bsStyle="success" title="Dropdown" id="callId">
      <MenuItem id="1" onSelect={onSelectAlert}>Alert</MenuItem>
      <MenuItem id="2" href="/flux.html">Link to Home</MenuItem>
    </DropdownButton>
    <Button bsStyle="info">Middle</Button>
    <Button bsStyle="info">Right</Button>
  </ButtonGroup>
);

ReactDOM.render(buttonGroupInstance, document.getElementById('topnavigation'));
