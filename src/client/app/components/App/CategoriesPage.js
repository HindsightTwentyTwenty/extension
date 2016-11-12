import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import SidebarComponent from '../Bars/SidebarComponent.js';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';

class CategoriesPage extends Component {

  constructor(props) {
    super(props);
    this.props.category_actions.fetchCategories();
  }

  render() {
    return (
      <div>
        <SidebarComponent title={"Categories"} allCategories={this.props.categories}/>
        <div className="search-results-container">
          <p>Search for categories here</p>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    categories: state.categories
})

let mapDispatchToProps = (dispatch) => {
  return {
    category_actions: bindActionCreators(CategoryActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPage);
