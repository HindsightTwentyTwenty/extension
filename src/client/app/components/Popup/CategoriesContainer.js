import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {render} from 'react-dom';
import CategoryBar from '../Bars/CategoryBar';
import SelectedCategoryBar from '../Bars/SelectedCategoryBar';
var classNames = require('classnames');

class CategoriesContainer extends Component {

  constructor(props) {
    super(props);
  }

  getCategoryBar(category, checked) {
    if (checked) {
      return <CategoryBar categoryInfo={category} checked={true} key={category.title}/>;
    } else {
      return <CategoryBar categoryInfo={category} checked={false} key={category.title}/>;
    }
  }

  getCategories() {
    var categories = this.props.categories.cats;
    if (categories != null && Object.keys(categories).length) {
      let result = []
      var currentPageCategories = this.props.currentPage.categories;
      var MAXDISPLAYCATEGORIES = 12;
      var numCheckedCategories = currentPageCategories.length <= MAXDISPLAYCATEGORIES ? currentPageCategories.length : MAXDISPLAYCATEGORIES;
      for (var i = 0; i < numCheckedCategories; i++) {
        result.push(this.getCategoryBar(currentPageCategories[i], true))
      }
      var numUncheckedCategories = MAXDISPLAYCATEGORIES <= categories.length ? MAXDISPLAYCATEGORIES - numCheckedCategories : categories.length - numCheckedCategories;
      var uncheckedCount = 0;
      while (uncheckedCount < numUncheckedCategories) {
        for (var i = categories.length-1; i >= 0; i--) {
          if(categories[i]){
            var alreadyAdded = false;
            for (var j = 0; j < currentPageCategories.length; j++) {
              if (currentPageCategories[j].title === categories[i].title) {
                alreadyAdded = true;
                break;
              }
            }
            if (!alreadyAdded) {
              result.push(this.getCategoryBar(categories[i]), false)
              uncheckedCount++;
              if (uncheckedCount == numUncheckedCategories) break;
            }
          }
        }
      }
      return result;
    }
  }

  render() {
    var classname = classNames('categories-container', this.props.className);
    return (
      <div className = {classname}>
        {this.getCategories()}
      </div>
    )
  };
}

let mapStateToProps = (state) => ({
    currentPage : state.currentPage,
    currentUser : state.currentUser,
    categories: state.categories,

})

export default connect(mapStateToProps, null)(CategoriesContainer);
