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
      <div className="popup-main-form">
				<br/>
        <p>Enter the email to your account:</p>
				<div className = 'popup-form-group'>
          <input type="text" className="popup-form form-control" placeholder="tommy@hindsite.com" ref={node => {this.input = node;}} />
        </div>
				<div className ="popup-button-group">
          <button className="btn btn-primary canteloupe" type="button" onClick={() => {
            this.submit(this.input.value);
            this.input.value = '';
          }}>Submit</button>
          <button className="btn btn-primary" type="button" onClick={() => {this.back()}}>Back</button>
        </div>
      </div>
    )
  }
}

let mapDispatchToProps = (dispatch) => ({
    user_actions: bindActionCreators(UserActions, dispatch)
})

export default connect(null, mapDispatchToProps)(ForgotMyPassword);
