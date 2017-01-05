import React, { PropTypes, Component } from 'react'
import PopupHeader from './PopupHeader.js';
import PopupBody from './PopupBody.js';
import LoginPage from './LoginPage.js';


class Popup extends Component {
  constructor(props) {
    super(props);
  }

  // render() {
  //   return (
  //     <div>
  //       <PopupHeader/>
  //       <PopupBody/>
  //     </div>
  //   );
  // }
  render() {
    return (
      <div>
        <LoginPage/>
      </div>
    );
  }
}

export default Popup;
