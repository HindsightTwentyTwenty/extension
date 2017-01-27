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
    var inputClass = editCategory == categoryTitle ? 'edit-category-entry' : 'edit-category-entry hidden';
    var categoryTitleClass = editCategory == categoryTitle ? 'category-title hidden' : 'category-title';
    var inputCheckButton = editCategory == categoryTitle ? 'fa fa-check edit-category-button' : 'fa fa-check edit-category-button hidden';
    var editCategoryButton = editCategory == categoryTitle ? 'fa fa-pencil edit-category-button hidden' : 'fa fa-pencil edit-category-button';
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
        <div className={inputClass}>
          <input className='edit-category-input' defaultValue={categoryTitle}
            onChange={(event) => {
              this.props.category_actions.updateCategoryEditField(event.target.value);
            }}
          />
        </div>
        <a onClick={() => {
          this.props.category_actions.updateCategoryEditField(categoryTitle);
          if (categoryTitle == editCategory) {
            var currentPageCategories = this.props.categories.cats;
            var existingCategoryName = false;
            for (let cat in currentPageCategories) {
              if (currentPageCategories[cat].title.trim() == textFieldValue.trim()) {
                existingCategoryName = true;
                break;
              }
            }
            if (!existingCategoryName) {
              this.props.category_actions.editCategoryTitle(categoryTitle, textFieldValue, userToken);
              this.props.category_actions.toggleEditCategory('');
            } else {
              alert("Category name already exists!");
            }
          } else {
            this.props.category_actions.toggleEditCategory(categoryTitle)
          }
        }}>
          <i className={editCategoryButton}/>
          <i className={inputCheckButton}/>
        </a>
        <a>
          <i className='fa fa-trash delete-category-button' onClick={() => {
            this.props.category_actions.updateSearchCategory(categoryTitle, false);
            this.props.category_actions.deleteCategory(categoryTitle, userToken); }}>
          </i>
        </a>
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
