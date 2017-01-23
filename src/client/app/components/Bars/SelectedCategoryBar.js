import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';

class SelectedCategoryBar extends Component {

  constructor(props) {
    super(props);
    this.categoryInfo = this.props.categoryInfo;
  }

  render() {
    return (
      <div className='category-bar selected'>
        <label htmlFor='categoryBar' className='category-bar-label selected hide-overflow'> {this.props.categoryInfo.title}</label>
        <button className='category-remove-btn' onClick={() => {
          this.props.category_actions.toggleCategory( this.props.currentPage.url,
            this.props.categoryInfo, false, this.props.currentUser.token);
        }}>X</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCategoryBar);
