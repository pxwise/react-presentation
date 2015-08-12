var Box = React.createClass({displayName: "Box",
  getInitialState: function() {
    return {
      colors: ['red','yellow','blue','green','teal','grey'],
      number: Math.round(Math.random() * 5),
    }
  },
  render: function() {
    return (
      React.createElement("div", {className: "box", style: {backgroundColor: this.state.colors[this.state.number]}}, 
        this.state.number
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

React.render(React.createElement(App, {exampleNumber: "3", subtitle: "this.state && this.props"}), document.body);
