var React = require('react');

var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var data = AppStore.data;

var Room = React.createClass({
    render: function () {
        return (
            <div className = "item room">
                <div> 
                    <h3>{this.props.title}</h3>
                    <img src={this.props.image} alt="The Pulpit Rock" width="304" height="228"></img>
                    <figcaption>Fig1. - A view of the pulpit rock in Norway.</figcaption>
                </div>
            </div>
            )
    }
});

var ItemList = React.createClass({
    handleClick: function () {
        AppActions.addItem('this is the item');
    },
    render: function () {
        // var ItemNodes = this.props.data.map(function(item) {
        var ItemNodes = data.map(function(item) {    
            return (
                <Room  key={item.id} title={item.title} image={item.image}>
                </Room>
            )
        });
        return (
            <div className = "items rooms">
                {ItemNodes}
            </div>
        );
    }
});

module.exports = ItemList;