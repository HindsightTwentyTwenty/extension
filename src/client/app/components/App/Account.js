import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as LoginActions from '../../actions/Popup/LoginActions.js';
import ChangeMyPassword from './ChangeMyPassword.js';

function getState(){
  return{
    change_password: false
  }
}

class Account extends Component {

  constructor(props) {
    super(props);
    this.state = getState();
  }

  logoutUser(){
    chrome.storage.local.remove("hindsite-token");
    this.props.login_actions.logoutUser();
    chrome.tabs.getCurrent(function(tab) {
      chrome.tabs.remove(tab.id, function() { });
    });
  }

  changeMyPassword() {
    console.log("setting to true");
    this.setState({
      change_password: true
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-10">
            <div className="section-title">Account</div>
            <button className="btn btn-primary" type="button" onClick={this.logoutUser.bind(this)}>Log Out</button>
            <button className="btn btn-primary" type="button" onClick={this.changeMyPassword.bind(this)}>Change Password</button>
            {this.state.change_password ? <ChangeMyPassword/> : <div></div>}
          </div>
        </div>
      </div>
    );
  }
}


let mapDispatchToProps = (dispatch) => {
  return {
		login_actions: bindActionCreators(LoginActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Account);
