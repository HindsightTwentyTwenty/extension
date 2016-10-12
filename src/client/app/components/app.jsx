import React, { Component } from 'react';
import {render} from 'react-dom';


class App extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {}
  }

  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default App;
