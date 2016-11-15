import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';

class DomainDetails extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    var currentDomain = this.props.currentDomainDisplayed;
    if(currentDomain.base_url === ""){
      return(<div className="lookback-details-container"><h3>Hover over timeline for detailed domain information.</h3></div>)
    } else {
      console.log(this.props.currentDomainDisplayed.clicked);
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
  currentDomainDisplayed: state.currentDomainDisplayed
})

let mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DomainDetails);
