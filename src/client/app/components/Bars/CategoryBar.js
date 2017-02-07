import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';

class CategoryBar extends Component {

  constructor(props) {
    super(props);
    this.categoryInfo = this.props.categoryInfo;
    this.color = this.getColor(this.categoryInfo.color);
  }

  getColor(hex) {
    var color = 'canteloupe';
    switch (hex) {
      case '#FFDB5C':
        return 'banana';
      case '#77F200':
        return 'lime';
      case '#FA6E59':
        return 'watermelon';
      default:
        return color;
    }
  }

  render() {
    var className = this.props.checked ? 'category-bar checked ' : 'category-bar ';
    return (
      <div
        className={className + this.color}
        onClick={() => {
          this.props.category_actions.toggleCategory( this.props.currentPage.url,
            this.props.categoryInfo, !this.props.checked, this.props.currentUser.token);
        }}>
        <label htmlFor='categoryBar' className={'category-bar-label hide-overflow'}> {this.props.categoryInfo.title} </label>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    currentPage : state.currentPage,
    currentUser : state.currentUser
})

let mapDispatchToProps = (dispatch) => ({
  category_actions: bindActionCreators(CategoryActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryBar);
