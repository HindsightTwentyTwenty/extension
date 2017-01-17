import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as UserActions from '../../actions/User/UserActions.js';

class ForgotMyPassword extends Component {

  constructor(props) {
    super(props);
  }

  submit(email){
    this.props.user_actions.forgotMyPasswordEmailSubmit(email);
  }

  back() {
    this.props.login_actions.forgotMyPasswordPage(false);
  }

  render() {
    return (
      <div>
        <button className="btn btn-primary" type="button" onClick={() => {
          this.back();
        }}>Back</button>
        <div className="section-title">Enter the email to your account:</div>
        <div className="input-group">
          <input type="text" className="form-control" placeholder="tommy@hindsite.com" ref={node => {
            this.input = node;
          }} />
          <span className="input-group-btn">
            <button className="btn btn-primary add-category-btn" type="button" onClick={() => {
              this.submit(this.input.value);
              this.input.value = '';
            }}>Submit</button>
          </span>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
})

let mapDispatchToProps = (dispatch) => ({
    user_actions: bindActionCreators(UserActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotMyPassword);
