import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as UserActions from '../../actions/User/UserActions.js';
import * as PopupConstants from '../../constants/PopupConstants.js';

class ForgotMyPassword extends Component {

  constructor(props) {
    super(props);
  }

  submit(email){
    this.props.user_actions.forgotMyPasswordEmailSubmit(email);
  }

  back() {
    this.props.user_actions.updatePopupStatus(PopupConstants.SignIn);
  }

  render() {
    return (
      <div className="popup-main-form electric-blue">
				<img className="logo" src="../../assets/img/logo.png"/>
        <h2 className="popup-header-text">Forgot Password</h2>

        <p className="forgot-password-text">Enter your email below to receive password reset instructions.</p>
				<div className = 'popup-form-group'>
          <input type="text" className="popup-form form-control" placeholder="&#xf003;  email address" ref={node => {this.input = node;}} />
        </div>
				<div className ="popup-button-group">
          <button className="btn popup-main-btn watermelon" type="button" onClick={() => {
            this.submit(this.input.value);
            this.input.value = '';
          }}>Reset Password</button>
          <button className="btn link-text-btn" type="button" onClick={() => {this.back()}}>Cancel</button>
        </div>
      </div>
    )
  }
}

let mapDispatchToProps = (dispatch) => ({
    user_actions: bindActionCreators(UserActions, dispatch)
})

export default connect(null, mapDispatchToProps)(ForgotMyPassword);
