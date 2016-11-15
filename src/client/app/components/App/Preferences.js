import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';

class Preferences extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="section-title">Preferences</div>
    )
  }

}

export default connect(null, null)(Preferences);
