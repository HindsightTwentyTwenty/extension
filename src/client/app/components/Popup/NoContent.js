import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import PopupHeader from './PopupHeader.js';

class NoContent extends Component {

  constructor(props) {
      super(props);
  }

  openTab () {
    if(this.props.currentUser.token.length != 0){
      chrome.tabs.create({'url': chrome.extension.getURL('/app/main.html')}, function(tab){
      });
    }
  }

  render () {
    return (
      <div className="popup-body electric-blue">
        <div id="popup-error">
          <i className="fa fa-exclamation-triangle" id="fa-error" aria-hidden="true"></i>
          <p className="popup-header-text zero-margin">hindsite</p>
          <p>is only meant for pages with urls beginning with http:// or https://. Please navigate to another page or </p>
          <p id="go-to-link" onMouseDown={()=>{this.openTab()}}>go to timeline.</p>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    currentUser : state.currentUser
})

let mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(NoContent);
