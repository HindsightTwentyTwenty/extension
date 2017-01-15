import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';

class SidebarCategoryBar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    var className = this.props.checked ? 'side-bar-category checked' : 'side-bar-category';
    var currentSearchCategories = this.props.currentSearchCategories.searchCats;
    var multiSelect = this.props.currentSearchCategories.multiSelect;
    var categoryTitle = this.props.categoryInfo.title;
    var userToken = this.props.currentUser.token;
    var editCategory = this.props.categories.editCategory;
    var textEntryClass = editCategory == categoryTitle ? 'edit-category-entry' : 'edit-category-entry hidden';
    var categoryTitleClass = editCategory == categoryTitle ? 'category-title hidden' : 'category-title';
    var textFieldValue = this.props.categories.newCategoryName;
    return (
      <div className={className}>
        <div className={categoryTitleClass}
          onClick={() => {
            if (!multiSelect) { // only choose one search category
              this.props.category_actions.clearSearchCategories();
            }
            this.props.category_actions.updateSearchCategory(
            categoryTitle, !this.props.checked);
          }}
        > {categoryTitle} </div>
        <div className={textEntryClass}>
          <textarea rows="1" id='edit-text-area' defaultValue=""
            onChange={(event) => {
              this.props.category_actions.updateCategoryEditField(event.target.value);
            }}
          />
        </div>

        <div className='delete-category-button' onClick={() => {
          this.props.category_actions.updateSearchCategory(categoryTitle, false);
          this.props.category_actions.deleteCategory(categoryTitle, userToken); }}/>
        <div className='edit-category-button' onClick={() => {
          if (categoryTitle == editCategory) {
            this.props.category_actions.editCategoryTitle(categoryTitle, textFieldValue, userToken);
            this.props.category_actions.toggleEditCategory('');
          } else {
            this.props.category_actions.toggleEditCategory(categoryTitle)
          }
        }}/>
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
