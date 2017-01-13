import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';

class SidebarCategoryBar extends Component {

  constructor(props) {
    super(props);
    this.categoryInfo = this.props.categoryInfo;
  }

  render() {
    var className = this.props.checked ? 'side-bar-category checked' : 'side-bar-category';
    var currentSearchCategories = this.props.currentSearchCategories.searchCats;
    var multiSelect = this.props.currentSearchCategories.multiSelect;
    var categoryTitle = this.props.categoryInfo.title;
    var userToken = this.props.currentUser.token;
    return (
      <div className={className}>
        <div className='category-title'
          onClick={() => {
            if (!multiSelect) { // only choose one search category
              this.props.category_actions.clearSearchCategories();
              this.props.category_actions.updateSearchCategory(
                categoryTitle, true);
            } else {
              this.props.category_actions.updateSearchCategory(
                categoryTitle, !this.props.checked);
            }}
          }
        > {categoryTitle} </div>
        <div className='delete-category-button' onClick={() => {
          this.props.category_actions.updateSearchCategory(categoryTitle, false);
          this.props.category_actions.deleteCategory(categoryTitle, userToken); }}/>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  categories : state.categories, 
  currentSearchCategories : state.currentSearchCategories,
  currentUser : state.currentUser
})

let mapDispatchToProps = (dispatch) => ({
  category_actions: bindActionCreators(CategoryActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarCategoryBar);
