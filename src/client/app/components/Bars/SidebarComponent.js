import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import SidebarCategoryBar from './SidebarCategoryBar';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';

class SidebarComponent extends Component {

  constructor(props) {
    super(props);
  }

  getCategories() {
    var currentSearchCategories = this.props.currentSearchCategories.searchCats;
    var allCategories = this.props.categories.cats;
    if (Object.keys(allCategories).length) {
      let result = [];
      let searchCategorySet = new Set(currentSearchCategories);
      for (var key in allCategories) {
        var checked = searchCategorySet.has(allCategories[key].title);
        result.push(<SidebarCategoryBar categoryInfo={allCategories[key]} checked={checked} key={allCategories[key].title}/>)
      }
      return result
    }
  }

  render() {
    var categories = this.getCategories();
    var showStarredStyle = this.props.categoriesAndPages.showStarred ? {"fontWeight" : "bold"} : {};
    var starClass = this.props.categoriesAndPages.showStarred ? 'fa fa-star side-bar-single-button selected' : 'fa fa-star side-bar-single-button';
    return (
      <div className="side-bar-container">
        <div className='side-bar-category fixed-header'>
          <div className='category-info'>
            <i className='fa fa-times side-bar-single-button'/>
            <div className='category-title'
              onClick={() => {
                this.props.category_actions.clearSearchCategories();
                if (this.props.categoriesAndPages.showStarred) {
                  this.props.category_actions.toggleShowStarred();
                }
              }}>
              clear selection
            </div>
          </div>
        </div>
        <div className='side-bar-category fixed-header'>
          <div className='category-info'>
            <i className={starClass}/>
            <div className='category-title'
              style={showStarredStyle}
              onClick={() => {
                this.props.category_actions.toggleShowStarred();
              }}>
              show starred
            </div>
          </div>
        </div>
        <div className="all-categories">{categories}</div>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  currentSearchCategories : state.currentSearchCategories,
  currentUser : state.currentUser,
  categories: state.categories,
  categoriesAndPages: state.categoriesAndPages
})

let mapDispatchToProps = (dispatch) => ({
  category_actions: bindActionCreators(CategoryActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarComponent);
