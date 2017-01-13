import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as UserActions from '../../actions/User/UserActions.js';

class Account extends Component {

  constructor(props) {
    super(props);
  }

  logoutUser(){
    chrome.storage.local.remove("hindsite-token");
    this.props.user_actions.logoutUser(this.props.currentUser.token);
    chrome.tabs.getCurrent(function(tab) {
      chrome.tabs.remove(tab.id, function() { });
    });
  }

  render() {
    return (
      <div>
        <div className="section-title">Account</div>
        <button className="btn btn-primary" type="button" onClick={this.logoutUser.bind(this)}>Log Out</button>
      </div>
    )
  }

}

let mapStateToProps = (state) => ({
	currentUser : state.currentUser
})

let mapDispatchToProps = (dispatch) => ({
    user_actions: bindActionCreators(UserActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Account);
