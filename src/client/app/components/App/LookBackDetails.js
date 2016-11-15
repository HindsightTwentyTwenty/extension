import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import DisplayDetails from './DisplayDetails.js';

class LookBackDetails extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="lookback-details-container">
        <DisplayDetails/>
      </div>
    )
  }
}



let mapStateToProps = (state) => ({
  currentDomainDisplayed: state.currentDomainDisplayed
})

let mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LookBackDetails);
