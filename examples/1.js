var MyFirstComponent = React.createClass({displayName: "MyFirstComponent",
  render: function() {
    return (
      React.createElement("div", null, "Hello ", this.props.name)
    )
  }
});

React.render(React.createElement(MyFirstComponent, {name: "Egg"}), document.body);
