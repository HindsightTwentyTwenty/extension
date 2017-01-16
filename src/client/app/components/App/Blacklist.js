import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';

class Blacklist extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="section-title">Blacklist</div>
        <div className="blacklist-text-entry">
          <input type="text" className="blacklist-text-entry" placeholder="Enter a domain to be blacklisted..." ref={node => {
            this.input = node;
          }} />
        </div>
      </div>
    )
  }
}

export default connect(null, null)(Blacklist);
