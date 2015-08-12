var Box = React.createClass({
  getInitialState: function() {
    return {
      number: Math.random()
    }
  },
  getDefaultProps: function() {
    return {
      myBoxStyle: {
        fontSize: 20,
        marginTop: 10,
        paddingLeft: 20,
        fontFamily: 'helvetica neue',
        fontWeight: 'normal'
      }
    }
  },
  render: function() {
    return (
      <div className="box" style={{backgroundColor: this.props.bgcolor}}>
        <h3 className="mybox" style={this.props.myBoxStyle} >{this.state.number}</h3>
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
      console.log(e.keyCode);
    });
  },
  componentWillReceiveProps: function(nextProps) {
    console.log('componentWillReceiveProps: Occurs any time properties or props are passed into this component.');
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    console.log('shouldComponentUpdate: return false to cancel rendering component. Very useful for performance optimization of many small components.')
  },
  componentWillUpdate: function() {
    console.log('componentWillUpdate: component is about to render to the DOM.');
  },
  componentDidUpdate: function() {
    console.log('componentDidUpdate: fired immediately after component has rendered to the DOM.');
  },
  componentWillUnmount: function() {
    console.log('componentWillUnmount: component will detach from the DOM. Cleanup any timers, event listeners or other variables in this hook.');

    document.body.removeEventListener('keydown', function(e) {
      console.log(e.keyCode);
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

React.render(<App exampleNumber="8" subtitle="CSS" />, document.body);
