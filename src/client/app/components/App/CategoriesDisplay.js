import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {render} from 'react-dom';
import CategoryBar from '../Bars/CategoryBar';
import SelectedCategoryBar from '../Bars/SelectedCategoryBar';

class CategoriesDisplay extends Component {

  constructor(props) {
    super(props);
  }

  getCategoryBar(category) {
    var currentPageCategories = this.props.categories.cats;
    return <CategoryBar categoryInfo={category} checked={true} key={category.title}/>;
  }

  getCategories() {
    var currentPageCategories = this.props.categories.cats;
    if (Object.keys(currentPageCategories).length) {
      let result = []
      for (let cat in currentPageCategories) {
        result.push(<SelectedCategoryBar categoryInfo={currentPageCategories[cat]} checked={false}
          key={currentPageCategories[cat].title}/>)
      }
      return result;
    }
  }

  render() {
    var categories = this.getCategories();
    var className = "categories-display hide-overflow";

    return (
      <div className={className}>
        {categories}
      </div>
    )
  };
}

let mapStateToProps = (state) => ({
    currentPage: state.currentPage,
    currentUser : state.currentUser

})

export default connect(mapStateToProps, null)(CategoriesDisplay);
