import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux'

import PopupHeader from './PopupHeader.js';
import PopupBody from './PopupBody.js';
import LoginPage from './LoginPage.js';
import CreateUser from './CreateUser.js';

import ForgotMyPassword from './ForgotMyPassword.js';
import * as LoginActions from '../../actions/Popup/LoginActions.js';


function getState() {
	return {
    create_user: false,
	}
}

class Popup extends Component {

  constructor(props) {
    super(props);
    chrome.storage.local.get("hindsite-token", this.props.login_actions.receiveUserTokenFromChrome);
  }


  renderContent(){
    if(this.props.currentUser.token.length == 0){
      if(this.props.currentUser.create_user){
        return(
          <div>
            <CreateUser/>
          </div>
        );
      }
      else if(this.props.currentUser.forgot == false){
        return (
          <div>
            <LoginPage/>
          </div>
        );
      } else {
        return (
          <div>
            <ForgotMyPassword/>
          </div>
        );
      }
    } else {
      return (
        <div>
          <PopupHeader/>
          <PopupBody/>
        </div>
      );
    }
  }


  render() {
    return (
      <div>
        { this.renderContent() }
      </div>
    );
  }
}


let mapStateToProps = (state) => ({
    currentUser : state.currentUser
})

let mapDispatchToProps = (dispatch) => {
  return {
    login_actions: bindActionCreators(LoginActions, dispatch)

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
