import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';

class SidebarCategoryBar extends Component {

  constructor(props) {
    super(props);
    this.categoryInfo = this.props.categoryInfo;
  }

  render() {
    var className = this.props.checked ? 'side-bar-category checked' : 'side-bar-category';
    var currentSearchCategories = this.props.currentSearchCategories.searchCats;
    var multiSelect = this.props.currentSearchCategories.multiSelect;
    return (
      <div className={className}
        onClick={() => {
          if (!multiSelect) { // only choose one search category
            this.props.category_actions.clearSearchCategories();
            this.props.category_actions.addSearchCategory(
              this.props.categoryInfo.title, true);
          } else {
            this.props.category_actions.addSearchCategory(
              this.props.categoryInfo.title, !this.props.checked);
          }}
        }
      >
        {this.props.categoryInfo.title}
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  currentSearchCategories : state.currentSearchCategories
})

let mapDispatchToProps = (dispatch) => ({
  category_actions: bindActionCreators(CategoryActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarCategoryBar);
