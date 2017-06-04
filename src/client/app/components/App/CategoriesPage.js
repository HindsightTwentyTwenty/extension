import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import SidebarComponent from '../Bars/SidebarComponent.js';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';
import SearchTile from './SearchTile.js';
import PageUrlBar from '../Bars/PageUrlBar.js';
import CategoryAutoSuggest from './CategoryAutoSuggest.js';
import CategoriesContainer from '../Popup/CategoriesContainer.js';
import * as PageDataActions from '../../actions/User/PageDataActions.js';
import * as NavActions from '../../actions/App/NavActions.js'
import CategoryCreator from '../SideBar/CategoryCreator.js';
import CategoryEditor from '../SideBar/CategoryEditor.js';


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

  componentWillMount(){
    // this.props.category_actions.clearSearchCategories();
    this.props.nav_actions.switchCategoryView("select");
    this.numResults = 0;
    this.props.nav_actions.setResultView("tiles");
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
      this.numResults = 0;
      if (searchCatSet.size) {
        for (let searchCat of searchCatSet.values()) {
          for (var i in categoriesPages[searchCat]) {
            var pagePk = categoriesPages[searchCat][i]
            if (!pageSet.has(pagePk)) {
              if (!showStarred || (showStarred && categoriesPages[searchCat][pagePk].star)) {
                if(this.props.appNav.resultView == "tiles"){
                  result.push(<SearchTile key={pagePk}
                    page={pkToPages[pagePk]}
                    />);
                }else if(this.props.appNav.resultView == "list"){
                  result.push(<PageUrlBar key={pagePk} page={pkToPages[pagePk]}/>)
                }
                pageSet.add(pagePk);
                this.numResults++;
              }
            }
          }
        }
      }
      if(result == []){
        <div className="welcome-message">
          <h4>No pages found with this tag.</h4>
        </div>
      }
      return result;
    }
  }


  render() {
    var searchResults = this.fetchPages();
    var resultsNavBar = this.numResults > 0 ? <div id="results-nav-bar">
      <p>{this.numResults} pages found</p>
      <div className="btn-results-view active" onClick={() => {this.props.nav_actions.setResultView("list")}}><i className="fa fa-th-list" aria-hidden="true"></i></div>
      <div className="btn-results-view" onClick={() => {this.props.nav_actions.setResultView("tiles");}}><i className="fa fa-th-large" aria-hidden="true"></i></div>
    </div> : '';
    var idName = this.props.appNav == "list" ? "list-results-container" : "tile-results-container";
    if (this.props.appNav.categoriesView == "create"){
      var categoriesView = <div className="categories-view"><CategoryCreator onClose={this.props.nav_actions.switchCategoryView}/></div>;
    }else if(this.props.appNav.categoriesView == "edit"){
      var categoriesView = <div className="categories-view"><CategoryEditor onClose={this.props.nav_actions.switchCategoryView}/></div>;
    }else{
      var categoriesView = <div><div className="category-select"><CategoryAutoSuggest categories={this.props.categories} onSelect={this.props.category_actions.updateSearchCategories}/></div>
      <CategoriesContainer numCats={Object.keys(this.props.categories.cats).length} onSelect={this.props.category_actions.updateSearchCategory} useCase={"search"}/></div>
    }
    return (
      <div className="categories-page">
        <div id="category-navigation">
          {categoriesView}
        </div>
        <div id={idName}>
          {resultsNavBar}
          {searchResults}
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    categories: state.popupCategories,
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
