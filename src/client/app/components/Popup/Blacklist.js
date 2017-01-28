import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';

class Blacklist extends Component {

  constructor(props) {
      super(props);
  }

  render () {
    return (
      <div className="error-message">
        <h4> You have blacklisted this site and thus Hindsite is not tracking it</h4>
        <h5> If you wish to change this you can in the Manage tab </h5>
      </div>
    )
  }
}

export default connect(null, null)(Blacklist);
