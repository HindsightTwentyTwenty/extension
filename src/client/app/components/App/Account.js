import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as UserActions from '../../actions/User/UserActions.js';
import ChangeMyPassword from './ChangeMyPassword.js';
import * as PasswordConstants from '../../constants/PasswordConstants.js'
import moment from 'moment';
import 'moment-timezone';

class Account extends Component {

  constructor(props) {
    super(props);
    if(!this.props.currentUser.first_name || !this.props.currentUser.email){
      this.props.user_actions.getUserInfo(this.props.currentUser.token);
    }
  }

  logoutUser(){
    chrome.storage.local.remove("hindsite-token");
    this.props.user_actions.logoutUser(this.props.currentUser.token);
    chrome.tabs.getCurrent(function(tab) {
      chrome.tabs.remove(tab.id, function() { });
    });
  }

  changeMyPassword() {
    this.props.user_actions.changeMyPasswordToggle(PasswordConstants.Open);
  }

  changeMyPasswordFields() {
    switch (this.props.currentUser.change_password) {
      case PasswordConstants.Open:
        return (
          <div id="change-password-fields">
            <ChangeMyPassword/>
          </div>
        )
      case PasswordConstants.Close:
        return <div></div>
      case PasswordConstants.Succesful:
        return (
          <div id="change-password-fields">
            <div id="change-password-response">Your Password Has Been Succesfully Changed!</div>
          </div>
        )
      case PasswordConstants.Unsuccesful:
        return (
          <div id="change-password-fields">
            <div id="change-password-response">Incorrect Password. Try Again.</div>
            <ChangeMyPassword/>
          </div>
        )
      case PasswordConstants.Nonmatch:
        return (
          <div id="change-password-fields">
            <div id="change-password-response">The submitted passwords did not match</div>
            <ChangeMyPassword/>
          </div>
        )
    }
  }

  getAccountTitle(){
    if(this.props.currentUser.first_name){
      return (
        <div className="section-title">
          {this.props.currentUser.first_name}&#39;s Account
        </div>
      )
    } else {
      return (
        <div className="section-title">
          Account
        </div>
      )
    }
  }

  displayUserInfo(){
    return (
      <div id="account-info">
        <div>
          Email: { this.props.currentUser.email }
        </div>
        <div>
          Account Created On: { moment(this.props.currentUser.created_at).format("MMM Do YY") }
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-10">
            { this.getAccountTitle() }
            { this.displayUserInfo() }
            <div id="account-options">
              <div>
                <button className="btn btn-primary account-button" onClick={this.logoutUser.bind(this)}>Log Out</button>
              </div>
              <div>
                <button className="btn btn-primary account-button" onClick={this.changeMyPassword.bind(this)}>Change Password</button>
                { this.changeMyPasswordFields() }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
	currentUser : state.currentUser
})


let mapDispatchToProps = (dispatch) => ({
    user_actions: bindActionCreators(UserActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Account);
