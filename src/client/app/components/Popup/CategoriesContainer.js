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
      for (let cat in this.props.categories) {
        result.push(this.getCategoryBar(this.props.categories[cat]))
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
    return (
      <div className="categories-container">
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