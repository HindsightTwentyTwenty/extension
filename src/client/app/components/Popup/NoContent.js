import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import PopupHeader from './PopupHeader.js';

class NoContent extends Component {

  constructor(props) {
      super(props);
  }

  render () {
    return (
      <div className="popup-body electric-blue">
        <div id="popup-error">
          <i className="fa fa-exclamation-triangle" id="fa-error" aria-hidden="true"></i>
          <p className="popup-header-text zero-margin">hindsite</p>
          <p>is only meant for pages with urls beginning with http:// or https://. Please navigate to another page or </p>
          <p id="go-to-link">go to timeline.</p>
        </div>
      </div>
    )
  }
}

export default connect(null, null)(NoContent);
