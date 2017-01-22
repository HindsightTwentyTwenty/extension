import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux'

import PopupHeader from './PopupHeader.js';
import PopupBody from './PopupBody.js';
import LoginPage from './LoginPage.js';
import CreateUser from './CreateUser.js';
import Loading from './Loading.js';
import NoContent from './NoContent.js';

import ForgotMyPassword from './ForgotMyPassword.js';
import * as UserActions from '../../actions/User/UserActions.js';
import * as PopupActions from '../../actions/Popup/PopupActions.js';

import * as PopupConstants from '../../constants/PopupConstants.js';


class Popup extends Component {

  constructor(props) {
    super(props);
    chrome.storage.local.get("hindsite-token", this.props.user_actions.receiveUserTokenFromChrome);
  }

	renderContent() {
		if(this.props.currentUser.token.length != 0){ //Logged In
			switch (this.props.currentUser.popup_status){
				case PopupConstants.Received: // Display Page
					return (
		        <div>
		          <PopupHeader/>
		          <PopupBody/>
		        </div>
		      );
				case PopupConstants.NoContent:
					return (
						<div>
							<PopupHeader/>
							<NoContent/>
						</div>
					);
				case PopupConstants.Loading:
				default: // Still Loading Page or Page Does Not Exist in Backend
					return (
						<div>
							<PopupHeader/>
							<Loading/>
						</div>
					);
			}
		} else { // Not Logged In
			switch (this.props.currentUser.popup_status) {
				case PopupConstants.SignIn:
					return <LoginPage/>
				case PopupConstants.SignUp:
					return <CreateUser/>
				case PopupConstants.ForgotMyPassword:
					return <ForgotMyPassword/>
				default:
					return (
						<div>
							<PopupHeader/>
							<Loading/>
						</div>
					);
			}
		}
	}

  render() {
    return (this.renderContent());
  }
}

let mapStateToProps = (state) => ({
    currentUser : state.currentUser,
		currentPage : state.currentPage
})

let mapDispatchToProps = (dispatch) => {
  return {
    user_actions: bindActionCreators(UserActions, dispatch),
		popup_actions: bindActionCreators(PopupActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
