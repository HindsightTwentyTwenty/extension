import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as UserActions from '../../actions/User/UserActions.js';
import * as PopupConstants from '../../constants/PopupConstants.js';
import * as types from '../../constants/ActionTypes';

const ERROR_COLOR = '#ff0000';

function getState() {
	return {
    email: "",
    password_1: "",
    first_name: "",
    last_name: "",
    password_2: "",
		email_error_message: "",
		pass_error_message: "",
		main_error_message: ""
	}
}

class CreateUser extends Component {
  constructor(props) {
      super(props);
  }

  updateField(event){
    this.setState({ [event.target.id]: event.target.value });
  }

	markError(element){
		document.getElementById(element).style.borderBottom = '1.5px solid ' + ERROR_COLOR;
	}

	markCorrect(element){
		document.getElementById(element).style.borderBottom = '1.5px solid #FAFAFA';
		document.getElementById(element).style.color = '#FAFAFA';
	}

  createNewUser(){
		var error = false;
		var empty = false;
		var email_correct = false;

		var fields = ['password_1', 'password_2', 'first_name', 'last_name']
		if(this.state != null){

			//check that passwords match
			if(this.state.password_1 != this.state.password_2){
				this.setState({ pass_error_message: 'The two password fields do not match.' });
				this.markError('password_1');
				this.markError('password_2');
				error = true;
			}else{
				this.setState({ pass_error_message: '' });
				this.markCorrect('password_1');
				this.markCorrect('password_2');
			}

			//check all fields filled in
			for(var i in fields){
				if(!document.getElementById(fields[i]).value || document.getElementById(fields[i]).value == ""){
					error = true;
					this.markError(fields[i]);
					this.setState({ main_error_message: 'Please fill empty fields.' });
				}else{this.markCorrect(fields[i]);}
			}

			//check valid email
			var email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			var patt = new RegExp(email_regex);

			if(!patt.test(this.state.email) && (this.state.email != "")){
				this.setState({ email_error_message: 'Not a Valid Email' });
				this.markError('email');
				error = true;
			}else{
				this.setState({ email_error_message: '' });
				this.markCorrect('email');
			}
			if(this.state.email == "" || !this.state.email){
				this.markError('email');
				this.setState({ email_error_message: '' });
			}

		}else{
			error = true;
			this.setState({ main_error_message: 'Cannot submit, form empty.' });
		}

		if(!error){
	    this.props.user_actions.createNewUser(this.state.email, this.state.password_1, this.state.password_2, this.state.first_name, this.state.last_name);
	    this.props.user_actions.updatePopupStatus(PopupConstants.SignIn);
		}
  }

	back() {
		this.props.user_actions.updatePopupStatus(PopupConstants.SignIn);
	}

  render () {
    return (
			<div className="popup-main-form electric-blue">
				<img className="logo" src="../../assets/img/logo-transparent.png"/>
        <h2>Create Account</h2>
				<div className="login-error" id="main-error">{this.state ? this.state.main_error_message : ''}</div>
				<div className = 'popup-form-group'>
					<input type="text" className="popup-form form-control" id="first_name" placeholder="&#xf007; first name" onChange={this.updateField.bind(this)} />
					<input type="text" className="popup-form form-control" id="last_name" placeholder="&#xf007; last name" onChange={this.updateField.bind(this)} />
					<div className="login-error" id="email-error">{this.state? this.state.email_error_message : ''}</div>
					<input type="email" className="popup-form form-control" id="email" placeholder="&#xf003; email" onChange={this.updateField.bind(this)} />
					<div className="login-error" id="password-error">{this.state? this.state.pass_error_message : ''}</div>
					<input type="password" className="popup-form form-control" id="password_1" placeholder="&#xf13e; password" onChange={this.updateField.bind(this)} />
					<input type="password" className="popup-form form-control" id="password_2" placeholder="&#xf13e; confirm password" onChange={this.updateField.bind(this)} />
        </div>
				<div className ="popup-button-group">
          <button className="btn popup-main-btn watermelon" type="button" onClick={this.createNewUser.bind(this)}>Submit</button>
          <button className="btn link-text-btn" type="button" onClick={() => {this.back()}}>Cancel</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
