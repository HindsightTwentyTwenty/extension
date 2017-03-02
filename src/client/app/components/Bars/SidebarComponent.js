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
      for (var i = 0; i < allCategories.length; i++) {
        if (!searchCategorySet.has(allCategories[i].title)) {
          result.push(<SidebarCategoryBar categoryInfo={allCategories[i]} checked={false} key={allCategories[i].title}/>)
        } else {
          result.push(<SidebarCategoryBar categoryInfo={allCategories[i]} checked={true} key={allCategories[i].title}/>)
        }
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
        <div className='side-bar-category'>
          <div className='category-info fixed-header'>
            <i className='fa fa-times side-bar-single-button'/>
            <div className='category-title'
              onClick={() => {
                this.props.category_actions.clearSearchCategories();
              }}>
              clear selection
            </div>
          </div>
        </div>
        <div className='side-bar-category'>
          <div className='category-info fixed-header'>
            <i className={starClass}/>
            <div className='category-title'
              style={showStarredStyle}
              onClick={() => {
                this.props.category_actions.toggleShowStarred();
              }}>
              only show starred
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
