import React, { PropTypes, Component } from 'react'
import PopupHeader from './PopupHeader.js';
import PopupBody from './PopupBody.js';


class Popup extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <PopupHeader/>
        <PopupBody/>
      </div>
    );
  }
}

export default Popup;
