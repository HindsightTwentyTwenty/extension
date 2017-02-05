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
      <div className="container popup-body electric-blue">
        <PopupHeader/>
        <div className="error-message">
          <h4> hindsite can only be used on pages with urls beginning with http:// or https://</h4>
          <h5> Please navigate to another page. </h5>
        </div>
      </div>
    )
  }
}

export default connect(null, null)(NoContent);
