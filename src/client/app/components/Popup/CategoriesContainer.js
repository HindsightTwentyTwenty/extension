import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {render} from 'react-dom';
import CategoryBar from '../Bars/CategoryBar';
import SelectedCategoryBar from '../Bars/SelectedCategoryBar';

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
    if (Object.keys(this.props.categories).length) {
      let result = []
      var currentPageCategories = this.props.currentPage.categories;
      var MAXDISPLAYCATEGORIES = 12;
      var numCheckedCategories = currentPageCategories.length <= MAXDISPLAYCATEGORIES ? currentPageCategories.length : MAXDISPLAYCATEGORIES;
      for (var i = 0; i < numCheckedCategories; i++) {
        result.push(this.getCategoryBar(currentPageCategories[i], true))
      }
      var numUncheckedCategories = MAXDISPLAYCATEGORIES <= this.props.categories.length ? MAXDISPLAYCATEGORIES - numCheckedCategories : this.props.categories.length - numCheckedCategories;
      var uncheckedCount = 0;
      while (uncheckedCount < numUncheckedCategories) {
        for (var i = this.props.categories.length-1; i >= 0; i--) {
          if(this.props.categories[i]){
            var alreadyAdded = false;
            for (var j = 0; j < currentPageCategories.length; j++) {
              if (currentPageCategories[j].title === this.props.categories[i].title) {
                alreadyAdded = true;
                break;
              }
            }
            if (!alreadyAdded) {
              result.push(this.getCategoryBar(this.props.categories[i]), false)
              uncheckedCount++;
              if (uncheckedCount == numUncheckedCategories) break;
            }
          }
        }
      }
      return result
    }
  }

  render() {
    return (
      <div className={"categories-container"}>
        {this.getCategories()}
      </div>
    )
  };
}

let mapStateToProps = (state) => ({
    currentPage : state.currentPage,
    categories: state.categories,

})

export default connect(mapStateToProps, null)(CategoriesContainer);
