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
          <div className="col-xs-6">
            <DomainDetails/>
          </div>
          <div className="col-xs-6">
          </div>
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
