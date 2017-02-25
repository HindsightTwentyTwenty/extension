import React, { PropTypes, Component } from 'react'
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as PopupActions from '../../actions/Popup/PopupActions.js';
import * as UserActions from '../../actions/User/UserActions.js';
import * as PopupConstants from '../../constants/PopupConstants.js';

class PopupHeader extends Component {
  constructor(props) {
    super(props);
  }

  openTab () {
    if(this.props.currentUser.token.length != 0){
      chrome.tabs.create({'url': chrome.extension.getURL('/app/main.html')}, function(tab){
      });
    }
  }

  logoutUser(){
    chrome.storage.local.remove("hindsite-token");
    this.props.user_actions.logoutUser(this.props.currentUser.token);
    window.close();
  }

  render () {
    return (
      <div className="popup-header-wrapper">
        <div className="popup-header" onMouseDown={()=>{this.openTab()}}>
          <img className="logo header zero-margin"  src="../../assets/img/logo-light.png"/>
          <p className="popup-header-text zero-margin">hindsite</p>
        </div>
        <p className="sign-out" onMouseDown={()=>{this.logoutUser()}}>Sign Out</p>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    pages : state.pages,
    currentUser : state.currentUser
})

let mapDispatchToProps = (dispatch) => ({
    user_actions: bindActionCreators(UserActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PopupHeader);
