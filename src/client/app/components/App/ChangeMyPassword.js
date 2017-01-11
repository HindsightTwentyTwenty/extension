import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as LoginActions from '../../actions/Popup/LoginActions.js';

class ChangeMyPassword extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log("change password render");
    return (
      <div> TEST </div>
    )
  }


}


let mapDispatchToProps = (dispatch) => ({
    login_actions: bindActionCreators(LoginActions, dispatch)
})

export default connect(null, mapDispatchToProps)(ChangeMyPassword);
