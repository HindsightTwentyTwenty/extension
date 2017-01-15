import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as LoginActions from '../../actions/Popup/LoginActions.js';
import ChangeMyPassword from './ChangeMyPassword.js';

class Account extends Component {

  constructor(props) {
    super(props);
  }

  logoutUser(){
    chrome.storage.local.remove("hindsite-token");
    this.props.login_actions.logoutUser(this.props.currentUser.token);
    chrome.tabs.getCurrent(function(tab) {
      chrome.tabs.remove(tab.id, function() { });
    });
  }

  changeMyPassword() {
    this.props.login_actions.toggleChangeMyPasswordPage(!this.props.currentUser.change_password);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-10">
            <div className="section-title">Account</div>
            <button className="btn btn-primary" type="button" onClick={this.logoutUser.bind(this)}>Log Out</button>
            <button className="btn btn-primary" type="button" onClick={this.changeMyPassword.bind(this)}>Change Password</button>
            {this.props.currentUser.change_password ? <ChangeMyPassword/> : <div></div>}
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Account);
