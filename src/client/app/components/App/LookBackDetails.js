import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import DomainDetails from './DomainDetails.js';

class LookBackDetails extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="lookback-details-container">
        <div className="row">
            <DomainDetails/>
        </div>
      </div>
    )
  }
}



let mapStateToProps = (state) => ({
  currentDomain: state.currentDomain
})

let mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LookBackDetails);
