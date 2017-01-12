import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as LoginActions from '../../actions/Popup/LoginActions.js';

function getState() {
	return {
    current_password: "",
    new_password: "",
    confirm_password: "",
	}
}

class ChangeMyPassword extends Component {
  constructor(props) {
      super(props);
  }

  updateField(event){
    this.setState({ [event.target.id]: event.target.value });
  }

  createNewUser(){
    console.log(this.state);

  }


  render () {

    return (
      <div>
        <div className ="row">
          <div className="col-xs-12">
            <div className="input-group">
              <input type="password" className="form-control" id="current_password" placeholder="Current Password" onChange={this.updateField.bind(this)} />
              <input type="password" className="form-control" id="new_password" placeholder="New Password" onChange={this.updateField.bind(this)} />
              <input type="password" className="form-control" id="confirm_password" placeholder="Confirm New Password" onChange={this.updateField.bind(this)} />
            </div>
            <br/>
            <span className="input-group-btn">
            <button className="btn btn-primary add-category-btn" type="button" onClick={this.createNewUser.bind(this)}>Submit</button>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

let mapDispatchToProps = (dispatch) => ({
    login_actions: bindActionCreators(LoginActions, dispatch)
})

export default connect(null, mapDispatchToProps)(ChangeMyPassword);
