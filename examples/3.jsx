var Box = React.createClass({
  getInitialState: function() {
    return {
      colors: ['red','yellow','blue','green','teal','grey'],
      number: Math.round(Math.random() * 5),
    }
  },
  render: function() {
    return (
      <div className="box" style={{backgroundColor: this.state.colors[this.state.number]}}>
        {this.state.number}
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

React.render(<App exampleNumber="3" subtitle="this.state && this.props" />, document.body);
