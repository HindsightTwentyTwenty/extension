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
    var categoriesPages = this.props.categoriesAndPages;
    if (categoriesPages.categories && Object.keys(categoriesPages.categories).length) {
      let result = []
      for (var j = 0; j < this.props.currentSearchCategories.length; j++) {
        for (let cat in categoriesPages.categories) {
          if (this.props.currentSearchCategories[j] == categoriesPages.categories[cat].title) {
            for (let page in categoriesPages.categories[cat].pages) {
              result.push(<PageUrlBar key={categoriesPages.categories[cat].pages[page].pk} page ={categoriesPages.categories[cat].pages[page]}/>)
            }
            break;
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
        <SidebarComponent title={"Categories"} allCategories={this.props.categories}/>
        <div className="search-results-container">
          <p>Search Results</p>
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
