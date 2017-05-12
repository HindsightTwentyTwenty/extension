import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';

import SidebarBox from './SidebarBox';
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
    chrome.storage.local.get("hindsite-token", this.props.user_actions.receiveFromChrome);

  }

  hideApp(){
    console.log("hiding app");
    $('outer-sidebar').hide();

  }

  renderContent() {
    console.log("Props in popup", this.props);
		if(this.props.currentUser.token.length != 0){ //Logged In
			switch (this.props.popupStatus){
				case PopupConstants.Received: // Display Page
					return (
            <div className="sidebar" id="outer-sidebar">
              <TagBox boxTitle="hindsite"/>
              <SidebarBox boxTitle="Notes"/>
              <SidebarBox boxTitle="Quick Tags"/>
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
							<PopupHeader/>
							<Error/>
						</div>
					);
          case PopupConstants.Blacklist:
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
              <TagBox boxTitle="hindsite"/>
              <SidebarBox boxTitle="Notes"/>
              <SidebarBox boxTitle="Quick Tags"/>
            </div>
					);
			}
		} else { // Not Logged In
      console.log("Popup status", this.props.popupStatus);
			switch (this.props.popupStatus) {
				case PopupConstants.SignIn:
					return (
            <div className="login-sidebar">
              <LoginPage/>
            </div>
          );
				case PopupConstants.SignUp:
					return (
            <div className="login-sidebar">
              <CreateUser/>
            </div>
          );
				case PopupConstants.ForgotMyPassword:
					return (
            <div className="login-sidebar">
              <ForgotMyPassword/>
            </div>
          );
				default:
					return (
						<div className="login-sidebar">
							<PopupHeader/>
							<Loading/>
						</div>
					);
			}
		}
	}
  render() {
    var open = true;
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if (request.greeting == "openSidebar"){
          console.log("GOT OPEN MSG");
          $('outer-sidebar').show();
          // document.getElementById('outer-sidebar').s
          }
        else if (request.greeting == "closeSidebar"){
          // this.hideApp();
          open = false;
          console.log("GOT CLOSE MSG");
          // $('outer-sidebar').css('display', 'inline-block');
          // $('outer-sidebar').hide();

          // var sidebar_out = document.getElementById('outer-sidebar');
          // sidebar_out.style.color = "red";


          }
      });
      if(!open){
        console.log("here here");
        this.hideApp();
      }

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
    popupStatus: state.popupStatus
})

let mapDispatchToProps = (dispatch) => {
  return {
    user_actions: bindActionCreators(UserActions, dispatch),
		popup_actions: bindActionCreators(PopupActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
