import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import Preferences from  './Preferences.js';
import Blacklist from  './Blacklist.js';
import Account from './Account.js';

class Manage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Account></Account>
        <Blacklist></Blacklist>
        <Preferences></Preferences>
      </div>
    )
  }

}

export default connect(null, null)(Manage);
