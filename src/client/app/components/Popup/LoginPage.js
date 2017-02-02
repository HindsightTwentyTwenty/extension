import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as PopupActions from '../../actions/Popup/PopupActions.js';
import * as UserActions from '../../actions/User/UserActions.js';

import * as PopupConstants from '../../constants/PopupConstants.js'

function getState() {
	return {
    user_name: "",
    password: ""

	}
}
class LoginPage extends Component {

  constructor(props) {
      super(props);
      this.state = getState();

  }

  updateUserName(event){
    this.setState({
      user_name: event.target.value
    });
  }

  updatePassword(event){
    this.setState({
      password: event.target.value
    });
  }

	forgotMyPassword(){
		this.props.user_actions.updatePopupStatus(PopupConstants.ForgotMyPassword);
	}

	createUserAccount(){
		this.props.user_actions.endErrorMessage();
		this.props.user_actions.updatePopupStatus(PopupConstants.SignUp);
	}

  loginUser(){
    this.props.user_actions.loginUser(this.state.user_name, this.state.password);
  }

  render () {
		var emailplaceholder = <div><i class="fa fa-envelope-o" aria-hidden="true"></i><p>email</p></div>
    return (
      <div className="popup-main-form electric-blue">
				<img className="logo" src="../../assets/img/logo-transparent.png"/>
				<h2 className="popup-header-text">hindsite</h2>
				<div className="login-error"> {this.props.currentUser.invalid_login ? 'Invalid Username or Password' : ''}</div>
				<div className = 'popup-form-group'>
					<input type="email" className="popup-form form-control" id="email" placeholder='&#xf003;  email address' onChange={this.updateUserName.bind(this)} />
	        <input type="password" className="popup-form form-control" id="password" placeholder="&#xf13e;  password" onChange={this.updatePassword.bind(this)} />
				</div>
				<div className ="popup-button-group">
				<button className="btn popup-main-btn watermelon" type="button" onClick={this.loginUser.bind(this)}>Sign In</button>
				<button className="link-text-btn" onClick={this.forgotMyPassword.bind(this)}>Forgot Password?</button>
					<button className="link-text-btn" onClick={this.createUserAccount.bind(this)}>New to hindsite? Sign up here.</button>
				</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
