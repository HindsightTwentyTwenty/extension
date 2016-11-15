import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';

class DisplayDetails extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    var currentDomain = this.props.currentDomainDisplayed;
    if(currentDomain.clicked == undefined){
      return(<div className="lookback-details-container"><h3>Hover over timeline for detailed domain information.</h3></div>)
    } else if(currentDomain.clicked){
      if(this.props.displayPage.url == undefined){
        return(<div className="lookback-details-container"><h3>Hover over domain for detailed page information.</h3></div>)
      }else{
        return(
          <div className="lookback-details-container">
            <h3>{this.props.displayPage.title}</h3>
            <p>{this.props.displayPage.url}</p>
            <p>CATEGORIES</p>
            <p>STAR</p>
          </div>
        )
      }
    }
    else {
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
  currentDomainDisplayed: state.currentDomainDisplayed,
  displayPage: state.currentPageDisplayed
})

let mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayDetails);
