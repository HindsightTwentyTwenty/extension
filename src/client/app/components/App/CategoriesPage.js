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
    this.props.category_actions.fetchCategories();
    this.props.category_actions.fetchCategoriesAndPages();
  }

  fetchPages() {
    var selectMultiple = document.getElementById("check-select") ? document.getElementById("check-select").checked : null;
    var categoriesPages = this.props.categoriesAndPages;
    if (categoriesPages.categories && Object.keys(categoriesPages.categories).length) {
      let result = []
      if (selectMultiple && this.props.currentSearchCategories.length) { //and
        for (var j = 0; j < this.props.currentSearchCategories.length; j++) {
          for (var i = 0; i < categoriesPages.categories.length; i++) {
            if (this.props.currentSearchCategories[j] == categoriesPages.categories[i].title) {
              for (let page in categoriesPages.categories[i].pages) {
                result.push(<PageUrlBar key={categoriesPages.categories[i].pages[page].pk} page ={categoriesPages.categories[i].pages[page]}/>)
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
        <SidebarComponent title={"Categories"} button={true} allCategories={this.props.categories}/>
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
})

let mapDispatchToProps = (dispatch) => {
  return {
    category_actions: bindActionCreators(CategoryActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPage);
