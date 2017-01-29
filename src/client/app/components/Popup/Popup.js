import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux'

import PopupHeader from './PopupHeader.js';
import PopupBody from './PopupBody.js';
import LoginPage from './LoginPage.js';
import CreateUser from './CreateUser.js';
import Loading from './Loading.js';
import NoContent from './NoContent.js';
import Error from './Error.js';
import Blacklist from './Blacklist.js';

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
		          <PopupHeader loggedIn={true}/>
		          <PopupBody/>
		        </div>
		      );
				case PopupConstants.NoContent:
					return (
						<div>
							<PopupHeader loggedIn={true}/>
							<NoContent/>
						</div>
					);
        case PopupConstants.Error:
					return (
						<div>
							<PopupHeader loggedIn={true}/>
							<Error/>
						</div>
					);
          case PopupConstants.Blacklist:
  					return (
  						<div>
  							<PopupHeader loggedIn={true}/>
  							<Blacklist/>
  						</div>
  					);
				case PopupConstants.Loading:
				default: // Still Loading Page or Page Does Not Exist in Backend
					return (
						<div>
							<PopupHeader loggedIn={true}/>
							<Loading/>
						</div>
					);
			}
		} else { // Not Logged In
			switch (this.props.currentUser.popup_status) {
				case PopupConstants.SignIn:
					return (
            <div>
              <LoginPage/>
            </div>
          );
				case PopupConstants.SignUp:
					return (
            <div>
              <PopupHeader loggedIn={false}/>
              <CreateUser/>
            </div>
          );
				case PopupConstants.ForgotMyPassword:
					return (
            <div>
              <ForgotMyPassword/>
            </div>
          );
				default:
					return (
						<div>
							<PopupHeader loggedIn={true}/>
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
