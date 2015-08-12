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

React.render(<App exampleNumber="5" subtitle="Lifecycle methods" />, document.body);
