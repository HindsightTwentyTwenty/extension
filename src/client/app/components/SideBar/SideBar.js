import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';

import NotesBox from './NotesBox.js';
import TagBox from './TagBox';
import PopupMenu from '../Popup/PopupMenu.js';
import PopupHeader from '../Popup/PopupHeader.js';
import PopupBody from '../Popup/PopupBody.js';
import LoginPage from '../Popup/LoginPage.js';
import CreateUser from '../Popup/CreateUser.js';
import Loading from '../Popup/Loading.js';
import NoContent from '../Popup/NoContent.js';
import Error from '../Popup/Error.js';
import Blacklist from '../Popup/Blacklist.js';
import ForgotMyPassword from '../Popup/ForgotMyPassword.js';

import * as UserActions from '../../actions/User/UserActions.js';
import * as PopupActions from '../../actions/Popup/PopupActions.js';
import * as PopupConstants from '../../constants/PopupConstants.js';


class Sidebar extends Component{
  constructor(props){
    super(props);
    chrome.storage.local.get(["hindsite-token"], this.props.user_actions.receiveFromChrome);
  }

  // hideApp(){
  //   console.log("hiding app");
  //   $('outer-sidebar').hide();
  //
  // }

  renderContent() {
		if(this.props.currentUser.token.length != 0){ //Logged In
			switch (this.props.popupStatus){
				case PopupConstants.Received: // Display Page
					return (
            <div className="sidebar" id="outer-sidebar">
              <TagBox/>
              <NotesBox/>
            </div>
		      );
				case PopupConstants.NoContent:
					return (
            <div className="sidebar">
							<NoContent/>
						</div>
					);
        case PopupConstants.Error:
					return (
            <div className="sidebar">
              <div className="login-wrapper">
							      <Error/>
              </div>
						</div>
					);
          case PopupConstants.Blacklist:
            console.log("BLACKLIST")
  					return (
              <div className="sidebar">
  							<PopupHeader/>
  							<Blacklist/>
  						</div>
  					);
				case PopupConstants.Loading:
				default: // Still Loading Page or Page Does Not Exist in Backend
					return (
            <div className="sidebar">
              <TagBox/>
              <NotesBox/>
            </div>
					);
			}
		} else { // Not Logged In
			switch (this.props.popupStatus) {
				case PopupConstants.SignIn:
					return (
            <div className="login-wrapper">
                <LoginPage/>
            </div>
          );
				case PopupConstants.SignUp:
					return (
            <div className="signup-wrapper">
              <CreateUser/>
            </div>
          );
				case PopupConstants.ForgotMyPassword:
					return (
            <div className="login-wrapper">
              <ForgotMyPassword/>
            </div>
          );
				default:
					return (
						<div className="login-wrapper">
              <LoginPage/>
						</div>
					);
			}
		}
	}
  render() {
    return (
      <div >
          {this.renderContent()}
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
    currentUser : state.currentUser,
		currentPage : state.currentPage,
    popupStatus: state.popupStatus,
})

let mapDispatchToProps = (dispatch) => {
  return {
    user_actions: bindActionCreators(UserActions, dispatch),
		popup_actions: bindActionCreators(PopupActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
