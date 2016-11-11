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
    return (
      <div className={'side-bar-category'}>
        {this.props.categoryInfo.title}
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    currentPage : state.currentPage
})

let mapDispatchToProps = (dispatch) => ({
  category_actions: bindActionCreators(CategoryActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarCategoryBar);
