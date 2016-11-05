import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';

class CategoryBar extends Component {

  constructor(props) {
    super(props);
    this.categoryInfo = this.props.categoryInfo;
  }

  render() {
    var className = this.props.checked ? 'category-bar checked' : 'category-bar';
    return (
      <div
        className={className}
        onClick={() => {
          this.props.category_actions.toggleCategory( this.props.currentPage.url,
            this.props.categoryInfo, !this.props.checked);
        }}>
        <label htmlFor='categoryBar' className="hide-overflow"> {this.props.categoryInfo.title} </label>
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryBar);
