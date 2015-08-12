var MyFirstComponent = React.createClass({
  render: function() {
    return (
      <div>Hello {this.props.name}</div>
    )
  }
});

React.render(<MyFirstComponent name="Egg" />, document.body);


