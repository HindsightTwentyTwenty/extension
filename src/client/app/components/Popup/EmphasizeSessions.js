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
import ColorPicker from './ColorPicker.js';
import * as PopupConstants from '../../constants/PopupConstants.js';

class EmphasizeSessions extends Component {
  constructor(props) {
    super(props);
  }

  getCurrentSession() {
    
  }

  render () {
      return (
        <div className="container popup-body electric-blue">
          <div className="popup-main-form">
            {this.getCurrentSession()}
            <button className="btn new-session-btn" type="button" onClick={() => {
            }}>Start New Session <i className="fa fa-plus" aria-hidden="true"></i></button>
          </div>
        </div>
      )
    }
  }

let mapStateToProps = (state) => ({
    currentPage : state.currentPage,
    categories: state.categories,
    currentUser : state.currentUser,
    popupSelection: state.popupSelection
})

let mapDispatchToProps = (dispatch) => {
  return {
    popup_actions : bindActionCreators(PopupActions, dispatch),
    category_actions: bindActionCreators(CategoryActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmphasizeSessions);
