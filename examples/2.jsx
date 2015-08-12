var Box = React.createClass({
  render: function() {
    return (
      <div className="box">
        {Math.random()}
      </div>
    )
  }
});

var App = React.createClass({
  render: function() {
    return (
      <div>
        <h1>{this.props.exampleNumber}. My React App - {this.props.subtitle}</h1>
        <Box />
        <Box />
        <Box />
      </div>
    )
  }
});

React.render(<App exampleNumber="2" subtitle="Composability" />, document.body);
