import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import SidebarComponent from '../Bars/SidebarComponent.js';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';
import SearchTile from './SearchTile.js';
import CategoryAutoSuggest from './CategoryAutoSuggest.js';
import CategoriesContainer from '../Popup/CategoriesContainer.js';
import * as PageDataActions from '../../actions/User/PageDataActions.js';
import * as NavActions from '../../actions/App/NavActions.js'
import CategoryCreator from '../SideBar/CategoryCreator.js';

function getState(){
  return{
    displayWelcomeMessage: true,
  }
}

class CategoriesPage extends Component {

  constructor(props) {
    super(props);
    this.state = getState();
    this.props.category_actions.fetchCategoriesAndPages(this.props.currentUser.token);
  }

  componentDidUpdate() {
    if (this.props.currentSearchCategories.searchCats &&
      this.props.currentSearchCategories.searchCats.size &&
      this.state.displayWelcomeMessage) {
      this.setState({displayWelcomeMessage: false});
    }
  }

  fetchPages() {
    var currentSearchCategories = this.props.currentSearchCategories.searchCats;
    var categoriesPages = this.props.categoriesAndPages.catsToPages;
    var pkToPages = this.props.categoriesAndPages.pkToPages;
    var starred = this.props.categoriesAndPages.starred;
    var showStarred = this.props.categoriesAndPages.showStarred;
    if (!this.props.currentSearchCategories.searchCats || this.props.currentSearchCategories.searchCats.size == 0) {
      return (
        <div className="welcome-message">
          <h4>Select or enter a tag to get started.</h4>
        </div>
      )
    }
    else {
      let result = [];
      var pageSet = new Set();
      let searchCatSet = new Set(currentSearchCategories);
      if (searchCatSet.size) {
        for (let searchCat of searchCatSet.values()) {
          for (var i in categoriesPages[searchCat]) {
            var pagePk = categoriesPages[searchCat][i]
            if (!pageSet.has(pagePk)) {
              if (!showStarred || (showStarred && categoriesPages[searchCat][pagePk].star)) {
                result.push(<SearchTile key={pagePk}
                  source="categories"
                  page={pkToPages[pagePk]}
                  />)
                pageSet.add(pagePk);
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
    if (this.props.appNav.categoriesView == "create"){
      return(
        <div className="categories-page">
          <CategoryCreator onClose={this.props.nav_actions.switchCategoryView}/>
        </div>
      )
    }else if(this.props.appNav.categoriesView == "edit"){
      return(
        <div className="categories-page">
          <CategoryEditor onClose={this.props.nav_actions.switchCategoryView}/>
        </div>
      )
    }
    return (
      <div className="categories-page">
        <div className="category-navigation">
          <div className="category-select">
  					<CategoryAutoSuggest categories={this.props.categories} onSelect={this.props.category_actions.updateSearchCategories}/>
  				</div>
          <CategoriesContainer numCats={Object.keys(this.props.categories.cats).length} onSelect={this.props.category_actions.updateSearchCategory} useCase={"search"}/>
        </div>
        <div className="search-results-container">
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
    currentUser : state.currentUser,
    appNav: state.appNav
})

let mapDispatchToProps = (dispatch) => ({
    category_actions: bindActionCreators(CategoryActions, dispatch),
    pagedata_actions: bindActionCreators(PageDataActions, dispatch),
    nav_actions: bindActionCreators(NavActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPage);
