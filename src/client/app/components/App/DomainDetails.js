import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';

class DomainDetails extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    var currentDomain = this.props.currentDomain;
    if(currentDomain.base_url === ""){
      return(<div></div>)
    } else{
      return (
          <div className="lookback-details-container">
            <h3>{currentDomain.title}</h3>
            <p>pages visited: {currentDomain.pages}</p>
            <p>minutes active: {currentDomain.minutes_active}</p>
          </div>
      )
    }
  }

}




let mapStateToProps = (state) => ({
  currentDomain: state.currentDomain
})

let mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DomainDetails);
