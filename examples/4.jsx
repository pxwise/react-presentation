var Box = React.createClass({
  getInitialState: function() {
    return {
      number: Math.random()
    }
  },
  render: function() {
    return (
      <div className="box" style={{backgroundColor: this.props.bgcolor}}>
        {this.state.number}
      </div>
    )
  }
});

var App = React.createClass({
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
      return <Box bgcolor={color} />;
    });
  },
  render: function() {
    return (
      <div>
        <h1>{this.props.exampleNumber}. My React App - {this.props.subtitle}</h1>
        {this._createBoxes()}
      </div>
    )
  }
});

React.render(<App exampleNumber="4" subtitle="Private functions" />, document.body);
