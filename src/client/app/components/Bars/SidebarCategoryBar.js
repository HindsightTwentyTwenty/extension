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
          this.props.category_actions.updateSearchCategory(categoryTitle, false); }}/>
      </div>
        // this.props.category_actions.deleteCategory(categoryTitle)}/>
    )
  }
}

let mapStateToProps = (state) => ({
  currentSearchCategories : state.currentSearchCategories,
  currentUser : state.currentUser
})

let mapDispatchToProps = (dispatch) => ({
  category_actions: bindActionCreators(CategoryActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarCategoryBar);
