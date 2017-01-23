import React, { Component } from 'react';
import {render} from 'react-dom';
import Popup from './Popup/Popup.js';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Popup/>
    )
  }
}

export default App;
