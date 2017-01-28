import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';
import CategoriesDisplay from './CategoriesDisplay.js'
import Star from '../Star/Star.js';
import CategoriesContainer from '../Popup/CategoriesContainer';
import CategoryEntry from '../Popup/CategoryEntry.js'
const Timestamp = require('react-timestamp');
class DisplayDetails extends Component {

  constructor(props) {
    super(props);
    this.props.category_actions.fetchCategories(this.props.currentUser.token);
  }

  render() {
    var currentDomain = this.props.currentDomainDisplayed;
    if(currentDomain.clicked == undefined){
      return(<div className="lookback-details-container"><h3>Hover over timeline for detailed domain information.</h3></div>)
    }else if(currentDomain.clicked && this.props.displayPage.url != ""){
      var categories = <div></div>;
      if(this.props.categories.cats.length > 0){
        categories = <CategoriesContainer />;
      }
      return(
        <div className="lookback-details-container page-details">
          <div className="row flex-row">
            <a className="page-title" target="_blank" href={this.props.displayPage.url}><h3>{this.props.displayPage.title}</h3></a>
            <Star className="star-display"/>
          </div>
          <hr className="display-view"/>
          <div className="row">
            <p>visited: <Timestamp time={this.props.displayPage.visited} format="full"/></p>
          </div>
          <div className="display-view">
            <CategoryEntry/>
            {categories}
          </div>
        </div>
      )
    } else {
      let closed = null;
      if(currentDomain.closed != null){
        closed = <p className={'domain-info'}>closed: <Timestamp time={currentDomain.closed} format="full"/></p>;
      }else{
        closed = <p className={'domain-info'}>closed: still open</p>;
      }
      let favicon = null;
      if(currentDomain.favicon != ""){
        favicon = <img className="display-favicon" src={currentDomain.favicon}/>
      }
      return (
          <div className="lookback-details-container domain-details">
              <div className="row flex-row">
                <div>
                  {favicon}
                </div>
                <h3>{currentDomain.title}</h3>
              </div>
              <div className="row flex-row">
                <p className={'domain-info'}>pages visited: {currentDomain.pages}</p>
                <p className={'domain-info'}>minutes active: {currentDomain.minutes_active}</p>
              </div>
              <div className="row flex-row">
                <p className={'domain-info'}>opened: <Timestamp time={currentDomain.created} format="full"/></p>
                {closed}
              </div>
          </div>
      )
      }
  }
}

let mapStateToProps = (state) => ({
  currentDomainDisplayed: state.currentDomainDisplayed,
  displayPage: state.currentPage,
  currentUser: state.currentUser,
  categories: state.categories
})

let mapDispatchToProps = (dispatch) => {
  return {
      category_actions: bindActionCreators(CategoryActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayDetails);
