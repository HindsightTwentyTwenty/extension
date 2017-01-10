import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as LoginActions from '../../actions/Popup/LoginActions.js';

class Account extends Component {

  constructor(props) {
    super(props);
  }

  logoutUser(){
    chrome.storage.local.remove("hindsite-token");
    this.props.login_actions.logoutUser();
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
})

let mapDispatchToProps = (dispatch) => ({
    login_actions: bindActionCreators(LoginActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Account);
