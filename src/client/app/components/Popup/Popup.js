import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux'

import PopupHeader from './PopupHeader.js';
import PopupBody from './PopupBody.js';
import LoginPage from './LoginPage.js';
import ForgotMyPassword from './ForgotMyPassword.js';
import * as LoginActions from '../../actions/Popup/LoginActions.js';



class Popup extends Component {
  constructor(props) {
    super(props);
    //chrome.storage.local.remove("hindsite-token");
    chrome.storage.local.get("hindsite-token", this.props.login_actions.receiveUserTokenFromChrome);
  }


  renderContent(){

    console.log("token");

    console.log("token1", this.props.currentUser);
    console.log("token 2", this.props.currentUser.token.length);
    // return (<div>stop</div>);
    if(this.props.currentUser.token.length == 0){
      console.log("forgot? ", this.props.currentUser.forgot);
      if(this.props.currentUser.forgot == false){
        console.log("login page display");
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
      console.log("logged in");
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
