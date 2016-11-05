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

  getCategoryBar(category) {
    var currentPageCategories = this.props.currentPage.categories;
    for (var i = 0; i < currentPageCategories.length; i++) {
      if (currentPageCategories[i].title === category.title) {
        return <CategoryBar categoryInfo={category} checked={true} key={category.title}/>;
      }
    }
    return <CategoryBar categoryInfo={category} checked={false} key={category.title}/>;
  }

  getCategories() {
    if (Object.keys(this.props.categories).length) {
      let result = []
      var MAXDISPLAYCATEGORIES = 12;
      var maxCategories = this.props.categories.length - 1;
      if(this.props.categories.length >= MAXDISPLAYCATEGORIES){
        maxCategories = MAXDISPLAYCATEGORIES;
      }
      for (var i = this.props.categories.length - 1; i >= this.props.categories.length - maxCategories - 1; i--) {
        result.push(this.getCategoryBar(this.props.categories[i]))
      }
      return result
    }
  }

  getSelectedCategories() {
    if (Object.keys(this.props.currentPage.categories).length) {
      let result = []
      for (let cat in this.props.currentPage.categories) {
        result.push(<SelectedCategoryBar categoryInfo={this.props.currentPage.categories[cat]} checked={false}
          key={this.props.currentPage.categories[cat].title}/>)
      }
      return result
    }
  }

  render() {
    var categories = this.props.all ? this.getCategories() : this.getSelectedCategories();
    var className = this.props.all ? "categories-container" : "categories-container selected";

    return (
      <div className={className}>
        {categories}
      </div>
    )
  };
}

let mapStateToProps = (state) => ({
    currentPage : state.currentPage,
    categories: state.categories
})

export default connect(mapStateToProps, null)(CategoriesContainer);
