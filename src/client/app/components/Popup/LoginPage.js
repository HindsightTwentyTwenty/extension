import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as PopupActions from '../../actions/Popup/PopupActions.js';
import * as LoginActions from '../../actions/Popup/LoginActions.js';

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
    console.log("user name update: ", event.target.value);
    this.setState({
      user_name: event.target.value
    });
  }

  updatePassword(event){
    console.log("user pass update: ", event.target.value);
    this.setState({
      password: event.target.value
    });
  }

	forgotMyPassword(){
		console.log("forgotMyPassword - in Login Page");
		this.props.login_actions.forgotMyPasswordPage(true);
	}

  loginUser(){
    //password
    console.log("login user item: ", this.state.user_name);
    console.log("login password item: ", this.state.password);

    this.props.login_actions.loginUser(this.state.user_name, this.state.password);
  }

  render () {
    return (
      <div className="container">
        <br/>
        <p>Please Login to hindsite:</p>
        <div className ="row">
          <div className="col-xs-12">
            <div className="input-group">
              <input type="email" className="form-control" id="user_name" placeholder="username" onChange={this.updateUserName.bind(this)} />
              <input type="password" className="form-control" id="password" placeholder="password" onChange={this.updatePassword.bind(this)} />
            </div>
            <br/>
            <span className="input-group-btn">
						<button className="btn btn-primary add-category-btn" type="button" onClick={this.loginUser.bind(this)}>Submit</button>
            </span>
          </div>
        </div>
				<div className ="row">
          <div className="col-xs-12">
					<button className="btn btn-primary" type="button" onClick={this.forgotMyPassword.bind(this)}>forgot my password</button>
					</div>
				</div>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
	currentUser : state.currentUser

})

let mapDispatchToProps = (dispatch) => ({
    login_actions: bindActionCreators(LoginActions, dispatch)

})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
