import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import CategoriesDisplay from './CategoriesDisplay.js'
import Star from '../Star/Star.js';
import CategoryEntry from '../Popup/CategoryEntry.js'

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
            </div>
            {categories}
            <CategoryEntry popup={false}/>
          </div>
        )
    } else {
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
  displayPage: state.currentPage
})

let mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayDetails);
