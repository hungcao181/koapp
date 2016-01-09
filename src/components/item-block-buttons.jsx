import React from 'react';
import {ButtonGroup, MenuItem, DropdownButton, Button} from 'react-bootstrap/lib';

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
module.exports = buttonGroupInstance;