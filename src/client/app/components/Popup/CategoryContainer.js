import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {render} from 'react-dom';
import CategoryBar from '../Bars/CategoryBar';

class CategoryContainer extends Component {

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

  getCategoryList() {
    if (Object.keys(this.props.categories).length) {
      let result = []
      for (let cat in this.props.categories) {
        result.push(this.getCategoryBar(this.props.categories[cat]))
      }
      return result
    }
  }

  render() {
    var categoryList = this.getCategoryList();
    return (
      <div>{categoryList}</div>
    )
  };
}

let mapStateToProps = (state) => ({
    currentPage : state.currentPage,
    categories: state.categories
})

export default connect(mapStateToProps, null)(CategoryContainer);
