import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';
import * as PopupActions from '../../actions/Popup/PopupActions.js';
import CategoryEntry from './CategoryEntry.js';
import Star from '../Star/Star.js';
import CategoriesContainer from './CategoriesContainer';

class PopupBody extends Component {
  constructor(props) {
    super(props);
    this.props.category_actions.fetchCategories(this.props.currentUser.token);
  }

  render () {
    if(!this.props.currentPage.url){
      return(
        <div className="container popup-body">
          <div className="error-message">
            <h4> Something went wrong!</h4>
            <h4> Please navigate to a different page to use hindsite.</h4>
          </div>
        </div>
      )
    } else {
      var categories = <div></div>;
      if(this.props.categories.cats.length > 0){
        categories = <CategoriesContainer/>;
      }
      return (
        <div className="container popup-body">
          <div className='popup-page-title'>
            <h3 className="hide-overflow">{this.props.currentPage.title}</h3>
            <Star/>
          </div>
          <hr/>
          <h4>categories</h4>
          <div className="categories-box">
            <CategoryEntry/>
            {categories}
          </div>
        </div>
      )
    }
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
