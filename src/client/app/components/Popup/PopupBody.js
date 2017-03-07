import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as CategoriesPagesActions from '../../actions/CategoriesPages/CategoriesPagesActions.js';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';
import * as PopupConstants from '../../constants/PopupConstants.js';
import PopupCategories from './PopupCategories.js';
import EmphasizeSessions from './EmphasizeSessions.js';

class PopupBody extends Component {
  constructor(props) {
    super(props);
    this.props.category_actions.fetchCategories(this.props.currentUser.token); // remove this later
    this.props.categories_pages_actions.fetchCategoriesAndPages(this.props.currentUser.token);
  }

  getPopupBody() {
    switch (this.props.popupSelection) {
      // case PopupConstants.POPUP_MENU_ITEMS[1].id: // Sessions
      //   return <EmphasizeSessions/>
      default:
        return <PopupCategories/> // Categories
    }
  }

  render () {
    return (
      this.getPopupBody()
    )
  }
}

let mapStateToProps = (state) => ({
    currentUser : state.currentUser,
    popupSelection: state.popupSelection
})

let mapDispatchToProps = (dispatch) => {
  return {
    category_actions: bindActionCreators(CategoryActions, dispatch),
    categories_pages_actions: bindActionCreators(CategoriesPagesActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupBody);
