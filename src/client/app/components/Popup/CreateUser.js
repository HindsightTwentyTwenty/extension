import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as UserActions from '../../actions/User/UserActions.js';
import * as PopupConstants from '../../constants/PopupConstants.js';

function getState() {
	return {
    email: "",
    password_1: "",
    first_name: "",
    last_name: "",
    password_2: ""
	}
}

class CreateUser extends Component {
  constructor(props) {
      super(props);
  }

  updateField(event){
    this.setState({ [event.target.id]: event.target.value });
  }

  createNewUser(){
    this.props.user_actions.createNewUser(this.state.email, this.state.password_1, this.state.password_2, this.state.first_name, this.state.last_name);
    this.props.user_actions.updatePopupStatus(PopupConstants.SignIn);
  }

	back() {
		this.props.user_actions.updatePopupStatus(PopupConstants.SignIn);
	}

  render () {
    return (
			<div className="popup-main-form electric-blue">
				<img className="logo" src="../../assets/img/logo-transparent.png"/>
        <h2>Create Account</h2>
				<div className = 'popup-form-group'>
					<input type="text" className="popup-form form-control" id="first_name" placeholder="&#xf007; first name" onChange={this.updateField.bind(this)} />
					<input type="text" className="popup-form form-control" id="last_name" placeholder="&#xf007; last name" onChange={this.updateField.bind(this)} />
					<input type="email" className="popup-form form-control" id="email" placeholder="&#xf003; email" onChange={this.updateField.bind(this)} />
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

let mapDispatchToProps = (dispatch) => ({
  user_actions: bindActionCreators(UserActions, dispatch)
})

export default connect(null, mapDispatchToProps)(CreateUser);
