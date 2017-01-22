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
		this.props.user_actions.updatePopupStatus(PopupConstants.SignUp);
	}

  loginUser(){
    this.props.user_actions.loginUser(this.state.user_name, this.state.password);
  }

  render () {
    return (
      <div className="popup-main-form">
				<br/>
        <p>Please login to use hindsite:</p>
				<div className={this.props.currentUser.invalid_login ? '' : 'hidden'}> Invalid Username or Password </div>
				<div className = 'popup-form-group'>
					<input type="email" className=" popup-form form-control" id="user_name" placeholder="username" onChange={this.updateUserName.bind(this)} />
	        <input type="password" className="popup-form form-control" id="password" placeholder="password" onChange={this.updatePassword.bind(this)} />
				</div>
				<div className ="popup-button-group">
					<button className="btn canteloupe btn-primary" type="button" onClick={this.loginUser.bind(this)}>Submit</button>
					<button className="btn btn-primary" type="button" onClick={this.forgotMyPassword.bind(this)}>Forgot Password</button>
					<button className="btn btn-primary" type="button" onClick={this.createUserAccount.bind(this)}>New Account</button>
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
