import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';
import * as PopupActions from '../../actions/Popup/PopupActions.js';
import CategoryEntry from './CategoryEntry.js';
import Star from '../Star/Star.js';
import CategoriesContainer from './CategoriesContainer';
import PopupHeader from './PopupHeader.js';


class PopupBody extends Component {
  constructor(props) {
    super(props);
    this.props.category_actions.fetchCategories(this.props.currentUser.token);
  }

  render () {
      var categories = <div></div>;
      if(this.props.categories.cats.length > 0){
        categories = <CategoriesContainer/>;
      }
      return (
        <div className="container popup-body electric-blue">
          <PopupHeader/>
          <hr/>
          <div className='popup-page-title'>
            <p className="hide-overflow">{this.props.currentPage.title}</p>
            <Star/>
          </div>
          <div className="popup-main-form">
            <CategoryEntry/>
            {categories}
          </div>
        </div>
      )
  }
}

let mapStateToProps = (state) => ({
    currentPage : state.currentPage,
    categories: state.categories,
    currentUser : state.currentUser

})

let mapDispatchToProps = (dispatch) => {
  return {
    popup_actions : bindActionCreators(PopupActions, dispatch),
    category_actions: bindActionCreators(CategoryActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupBody);
