import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import CategoriesDisplay from './CategoriesDisplay.js'
import Star from '../Star/Star.js';
import CategoryEntry from '../Popup/CategoryEntry.js'
const Timestamp = require('react-timestamp');
class DisplayDetails extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    var currentDomain = this.props.currentDomainDisplayed;
    if(currentDomain.clicked == undefined){
      return(<div className="lookback-details-container"><h3>Hover over timeline for detailed domain information.</h3></div>)
    }else if(currentDomain.clicked && this.props.displayPage.url != ""){
      var categories = <div></div>;
      if(this.props.displayPage.categories.length > 0){
        categories = <CategoriesDisplay categories={this.props.displayPage.categories}/>
      }
      return(
        <div className="lookback-details-container">
          <div className="row">
            <a target="_blank" href={this.props.displayPage.url}><h3>{this.props.displayPage.title}</h3></a>
            <Star/>
            <p>created: <Timestamp time={this.props.displayPage.created} format="full"/></p>
          </div>
          {categories}
          <CategoryEntry popup={false}/>
        </div>
      )
    } else {
      let closed = null;
      if(currentDomain.closed != null){
        closed = <p>closed: <Timestamp time={currentDomain.closed} format="full"/></p>;
      }else{
        closed = <p>closed: still open</p>;
      }
      return (
          <div className="lookback-details-container">
            <h3>{currentDomain.title}</h3>
            <p>pages visited: {currentDomain.pages}</p>
            <p>minutes active: {currentDomain.minutes_active}</p>
            <p>created: <Timestamp time={currentDomain.created} format="full"/></p>
            {closed}
          </div>
      )
      }
  }
}

let mapStateToProps = (state) => ({
  currentDomainDisplayed: state.currentDomainDisplayed,
  displayPage: state.currentPage
})

let mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayDetails);
