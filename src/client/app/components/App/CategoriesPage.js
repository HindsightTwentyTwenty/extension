import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import SidebarComponent from '../Bars/SidebarComponent.js';
import PageUrlBar from '../Bars/PageUrlBar.js';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';

class CategoriesPage extends Component {

  constructor(props) {
    super(props);
    this.props.category_actions.fetchCategories( this.props.currentUser.token);
    this.props.category_actions.fetchCategoriesAndPages( this.props.currentUser.token);
  }

  fetchPages() {
    var currentSearchCategories = this.props.currentSearchCategories.searchCats;
    var categoriesPages = this.props.categoriesAndPages.cats.categories;
    var starred = this.props.categoriesAndPages.cats.starred;
    if (categoriesPages && Object.keys(categoriesPages).length) {
      let result = [];
      let pageSet = new Set();
      let searchCatSet = new Set(currentSearchCategories);
      if (searchCatSet.size) {
        for (var i = 0; i < categoriesPages.length; i++) {
          var searchCat = categoriesPages[i];
          if (searchCatSet.has(searchCat.title)) {
            for (let page in searchCat.pages) {
              if (!pageSet.has(searchCat.pages[page].pk)) {
                result.push(<PageUrlBar key={searchCat.pages[page].pk} page={searchCat.pages[page]}/>)
                pageSet.add(searchCat.pages[page].pk);
              }
            }
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
        <SidebarComponent title={"Categories"} button={true}/>
        <div className="search-results-container">
          <div className="section-title">Search Results</div>
          {searchResults}
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    categories: state.categories,
    categoriesAndPages: state.categoriesAndPages,
    currentSearchCategories : state.currentSearchCategories,
    currentUser : state.currentUser

})

let mapDispatchToProps = (dispatch) => {
  return {
    category_actions: bindActionCreators(CategoryActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPage);
