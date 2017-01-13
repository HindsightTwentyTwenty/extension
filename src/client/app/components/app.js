import React, { Component } from 'react';
import {render} from 'react-dom';
import Popup from './Popup/Popup.js';

class App extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {}
  }

  render () {
    return (
      <div>
        <Popup/>
      </div>
    )
  }
}

export default App;
