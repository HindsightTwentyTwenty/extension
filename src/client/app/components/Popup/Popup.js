import React, { PropTypes, Component } from 'react'
import PopupHeader from './PopupHeader.js';
import PopupBody from './PopupBody.js';


class Popup extends Component {

  constructor(props) {
    super(props);
    // this.onLike = this.onLike.bind(this);
  }

  /*
  onLike () {
    // let newLikesCount = this.state.likesCount + 1;
    // this.setState({likesCount: newLikesCount});
    chrome.tabs.create({'url': chrome.extension.getURL('/app/main.html')}, function(tab){

    });
  }
  */

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
