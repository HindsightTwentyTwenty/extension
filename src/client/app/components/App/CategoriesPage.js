import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import SidebarComponent from '../Bars/SidebarComponent.js';
import PageUrlBar from '../Bars/PageUrlBar.js';
import * as CategoriesPagesActions from '../../actions/CategoriesPages/CategoriesPagesActions.js';

function getState(){
  return{
    displayWelcomeMessage: true
  }
}

class CategoriesPage extends Component {

  constructor(props) {
    super(props);
    this.state = getState();
    this.props.categories_pages_actions.fetchCategoriesAndPages(this.props.currentUser.token);
  }

  componentDidUpdate() {
    if (this.props.searchCategories.categories &&
      this.props.searchCategories.categories.size &&
      this.state.displayWelcomeMessage) {
      this.setState({displayWelcomeMessage: false});
    }
  }

  fetchPages() {
    var searchCategories = this.props.searchCategories.categories;
    var categories = this.props.categoriesAndPages.categories;
    var starred = this.props.categoriesAndPages.starred;
    var showStarred = this.props.searchCategories.showStarred;
    if (this.state.displayWelcomeMessage) {
      return (
        <div className="welcome-message">
          <h4>Select categories from the sidebar to see your categorized pages.</h4>
          <h4>Use the <i className='fa fa-pencil'/> and <i className='fa fa-trash'/> to edit and delete your categories.</h4>
        </div>
      )
    } else if (categories && Object.keys(categories).length) {
      let result = [];
      var pageSet = new Set();
      if (searchCategories.size) {
        for (let searchCat of searchCategories.values()) {
          for (let pagePk of categories[searchCat].pages.values()) {
            if (!pageSet.has(pagePk)) {
              if (!showStarred || (showStarred && starred.contains(pagePk))) {
                result.push(<PageUrlBar key={pagePk} pk={pagePk}/>)
                pageSet.add(pagePk);
              }
            }
          }
        }
      } else if (showStarred) {
        for (let starredPk of starred.values()) {
          if (!pageSet.has(starredPk)) {
            result.push(<PageUrlBar key={pagePk} pk={pagePk}/>)
            pageSet.add(pagePk);
          }
        }
      }
      return result
    }
  }

  render() {
    var searchResults = this.fetchPages();
    return (
      <div className="categories-page">
        <SidebarComponent/>
        <div className="search-results-container">
          {searchResults}
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    categoriesAndPages: state.categoriesAndPages,
    searchCategories : state.searchCategories,
    currentUser : state.currentUser
})

let mapDispatchToProps = (dispatch) => {
  return {
    categories_pages_actions: bindActionCreators(CategoriesPagesActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPage);
