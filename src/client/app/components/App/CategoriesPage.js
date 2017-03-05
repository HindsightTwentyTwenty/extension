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
    this.props.category_actions.fetchCategoriesAndPages(this.props.currentUser.token);
  }

  fetchPages() {
    var currentSearchCategories = this.props.currentSearchCategories.searchCats;
    var categoriesPages = this.props.categoriesAndPages.catsToPages;
    var starred = this.props.categoriesAndPages.starred;
    var showStarred = this.props.categoriesAndPages.showStarred;
    if (categoriesPages && Object.keys(categoriesPages).length) {
      let result = [];
      var pageSet = new Set();
      let searchCatSet = new Set(currentSearchCategories);
      if (searchCatSet.size) {
        for (let searchCat of searchCatSet.values()) {
          for (var pagePk in categoriesPages[searchCat]) {
            if (!pageSet.has(pagePk)) {
              if (!showStarred || (showStarred && categoriesPages[searchCat][pagePk].star)) {
                result.push(<PageUrlBar key={pagePk}
                  source="categories"
                  page={categoriesPages[searchCat][pagePk]}
                  domain={categoriesPages[searchCat][pagePk].domain}
                  visited={categoriesPages[searchCat][pagePk].last_visited}/>)
                pageSet.add(pagePk);
              }
            }
          }
        }
      } else if (showStarred) {
        for (var pagePk in starred) {
          if (!pageSet.has(pagePk)) {
            result.push(<PageUrlBar key={pagePk}
              source="categories"
              page={starred[pagePk]}
              domain={starred[pagePk].domain}
              visited={starred[pagePk].last_visited}/>)
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
        <SidebarComponent button={true}/>
        <div className="search-results-container">
          <div className="section-title"></div>
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
