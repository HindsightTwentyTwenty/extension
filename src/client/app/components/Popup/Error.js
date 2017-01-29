import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';

class Error extends Component {

  constructor(props) {
      super(props);
  }

  render () {
    return (
      <div className="error-message">
        <h4> An error has occured. Please try closing and reopening the Popup.</h4>
      </div>
    )
  }
}

export default connect(null, null)(Error);
