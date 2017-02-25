import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';

class SidebarCategoryBar extends Component {

  constructor(props) {
    super(props);
  }

  getCategoryTitle() {
    var categoryTitle = this.props.categoryInfo.title;
    var categoryColor = this.props.categoryInfo.color;
    var checkedTitleStyle = this.props.checked ? {"color" : categoryColor, "fontWeight" : "bold"} : {};
    var checkedBoxStyle = this.props.checked ? {"backgroundColor" : categoryColor, "opacity" : "1"} : {"backgroundColor" : categoryColor, "opacity" : "0.5"};
    var editCategory = this.props.categories.editCategory;
    return (
      <div className='side-bar-category'>
        <div className='category-info'>
          <div className='color-square-small' style={checkedBoxStyle}/>
          <div className='category-title'
            style={checkedTitleStyle}
            onClick={() => {
              this.props.category_actions.updateSearchCategory(categoryTitle, !this.props.checked);
            }}>
            {categoryTitle}
          </div>
        </div>
        <div className='side-bar-buttons'>
          <a onClick={() => {this.props.category_actions.toggleEditCategory(categoryTitle);}}>
            <i className='fa fa-pencil left-sidebar-button'/>
          </a>
          <a onClick={() => {this.props.category_actions.toggleDeleteCategory(categoryTitle);}}>
            <i className='fa fa-trash right-sidebar-button'/>
          </a>
        </div>
      </div>
    );
  }

  getDeleteCategory() {
    var categoryTitle = this.props.categoryInfo.title;
    var userToken = this.props.currentUser.token;
    return(
      <div className='side-bar-category'>
        <div className='category-title'>
          are you sure?
        </div>
        <div className='side-bar-buttons'>
          <a onClick={() => {
            this.props.category_actions.updateSearchCategory(categoryTitle, false);
            this.props.category_actions.deleteCategory(categoryTitle, userToken);
          }}>
            <i className='fa fa-check left-sidebar-button'/>
          </a>
          <a onClick={() => {
            this.props.category_actions.toggleDeleteCategory('');
          }}>
            <i className='fa fa-times right-sidebar-button'/>
          </a>
        </div>
      </div>
    )
  }

  getEditCategory() {
    var categoryTitle = this.props.categoryInfo.title;
    var categoryColor = this.props.categoryInfo.color;
    var userToken = this.props.currentUser.token;
    return (
      <div className='side-bar-category'>
        <div className='category-info'>
          <div className='color-square-small' style={{"backgroundColor" : categoryColor}}/>
          <input className='edit-category-input' defaultValue={categoryTitle}
            ref={node => {this.input = node;}}
          />
        </div>
        <div className='side-bar-buttons'>
          <a onClick={() => {
            var input = this.input.value.trim();
            var categoriesSet = new Set();
            this.props.categories.cats.map(function(category) {
              categoriesSet.add(category.title);
            })
            if (input == categoryTitle) {
              this.props.category_actions.toggleEditCategory('');
            } else if (categoriesSet.has(input)) {
              alert("Category name already exists!");
            } else {
              this.props.category_actions.editCategoryTitle(categoryTitle, input, userToken);
              this.props.category_actions.toggleEditCategory('');
            }
          }}>
            <i className='fa fa-check left-sidebar-button'/>
          </a>
          <a onClick={() => {
            this.props.category_actions.toggleEditCategory('');
          }}>
            <i className='fa fa-times right-sidebar-button'/>
          </a>
        </div>
      </div>
    );
  }

  render() {
    var editCat = this.props.categories.editCategory == this.props.categoryInfo.title ? true : false;
    var deleteCat = this.props.categories.confirmDelete == this.props.categoryInfo.title ? true : false;
    if (editCat) {
      return this.getEditCategory();
    } else if (deleteCat) {
      return this.getDeleteCategory();
    } else {
      return this.getCategoryTitle();
    }
  }
}

let mapStateToProps = (state) => ({
  categories : state.categories,
  currentUser : state.currentUser
})

let mapDispatchToProps = (dispatch) => ({
  category_actions: bindActionCreators(CategoryActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarCategoryBar);
