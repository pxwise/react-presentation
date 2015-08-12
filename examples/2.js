var Box = React.createClass({displayName: "Box",
  render: function() {
    return (
      React.createElement("div", {className: "box"}, 
        Math.random()
      )
    )
  }
});

var App = React.createClass({displayName: "App",
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("h1", null, this.props.exampleNumber, ". My React App - ", this.props.subtitle), 
        React.createElement(Box, null), 
        React.createElement(Box, null), 
        React.createElement(Box, null)
      )
    )
  }
});

React.render(React.createElement(App, {exampleNumber: "2", subtitle: "Composability"}), document.body);
