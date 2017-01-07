import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as LoginActions from '../../actions/Popup/LoginActions.js';

class ForgotMyPassword extends Component {

  constructor(props) {
    super(props);
  }

  submit(email){
    this.props.login_actions.forgotMyPasswordEmailSubmit(email);
  }

  render() {
    return (
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
    )
  }
}

let mapStateToProps = (state) => ({
})

let mapDispatchToProps = (dispatch) => ({
    login_actions: bindActionCreators(LoginActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotMyPassword);
