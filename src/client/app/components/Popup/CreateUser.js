import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as LoginActions from '../../actions/Popup/LoginActions.js';


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
    console.log(this.state);
    this.props.login_actions.createNewUser(this.state.email, this.state.password_1, this.state.password_2, this.state.first_name, this.state.last_name);
    this.props.login_actions.createNewUserPage(false);

  }


  render () {

    return (
      <div>
        <span>Create a new user account:</span>
        <div className ="row">
          <div className="col-xs-12">
            <div className="input-group">
              <input type="text" className="form-control" id="first_name" placeholder="First Name" onChange={this.updateField.bind(this)} />
              <input type="text" className="form-control" id="last_name" placeholder="Last Name" onChange={this.updateField.bind(this)} />

              <input type="email" className="form-control" id="email" placeholder="email" onChange={this.updateField.bind(this)} />
              <input type="password" className="form-control" id="password_1" placeholder="password" onChange={this.updateField.bind(this)} />
              <input type="password" className="form-control" id="password_2" placeholder="confirm password" onChange={this.updateField.bind(this)} />

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

let mapStateToProps = (state) => ({

})

let mapDispatchToProps = (dispatch) => ({
  login_actions: bindActionCreators(LoginActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
