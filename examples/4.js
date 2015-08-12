var Box = React.createClass({displayName: "Box",
  getInitialState: function() {
    return {
      number: Math.random()
    }
  },
  render: function() {
    return (
      React.createElement("div", {className: "box", style: {backgroundColor: this.props.bgcolor}}, 
        this.state.number
      )
    )
  }
});

var App = React.createClass({displayName: "App",
  // return rgb(123,12,342);
  _createColor: function() {
    return 'rgb(' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ')';
  },
  // return a random number of Box components with random bgcolors
  _createBoxes: function() {
    var boxes = []
    for (var i = 0; i < Math.round(Math.random() * 20); i++) {
      boxes.push(this._createColor())
    }

    return boxes.map(function(color) {
      return React.createElement(Box, {bgcolor: color});
    });
  },
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("h1", null, this.props.exampleNumber, ". My React App - ", this.props.subtitle), 
        this._createBoxes()
      )
    )
  }
});

React.render(React.createElement(App, {exampleNumber: "4", subtitle: "Private functions"}), document.body);
