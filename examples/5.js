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
  componentWillMount: function() {
    console.log('componentWillMount: App is about to mount to the body element. Occurs once.');
  },
  componentDidMount: function() {
    console.log('componentDidMount: Occurs once, after component has attached to DOM.');
    console.log('Any access to the actual DOM must occur in this method.');

    document.body.addEventListener('keydown', function(e) {
      alert(e.keyCode);
    });
  },
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

React.render(React.createElement(App, {exampleNumber: "5", subtitle: "Lifecycle methods"}), document.body);
