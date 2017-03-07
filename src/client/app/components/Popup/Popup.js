import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux'

import PopupMenu from './PopupMenu.js';
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
    chrome.storage.local.get("hindsite-token", this.props.user_actions.receiveFromChrome);
  }

	renderContent() {
		if(this.props.currentUser.token.length){ //Logged In
			switch (this.props.currentUser.popup_status){
				case PopupConstants.Received: // Display Page
					return (
		        <div>
              <PopupHeader/>
              <PopupMenu/>
		          <PopupBody/>
		        </div>
		      );
				case PopupConstants.NoContent:
					return (
						<div>
							<NoContent/>
						</div>
					);
        case PopupConstants.Error:
					return (
						<div>
							<PopupHeader/>
							<Error/>
						</div>
					);
          case PopupConstants.Blacklist:
  					return (
  						<div>
  							<PopupHeader/>
  							<Blacklist/>
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
					return (
            <div>
              <LoginPage/>
            </div>
          );
				case PopupConstants.SignUp:
					return (
            <div>
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
    user_actions: bindActionCreators(UserActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
