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
    var currentPageCategories = this.props.categories;
    return <CategoryBar categoryInfo={category} checked={true} key={category.title}/>;
  }

  getCategories() {
    if (Object.keys(this.props.categories).length) {
      let result = []
      for (let cat in this.props.categories) {
        result.push(<SelectedCategoryBar categoryInfo={this.props.categories[cat]} checked={false}
          key={this.props.categories[cat].title}/>)
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
