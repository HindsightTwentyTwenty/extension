import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as CategoriesPagesActions from '../../actions/CategoriesPages/CategoriesPagesActions.js';
import * as PopupActions from '../../actions/Popup/PopupActions.js';
import CategoryEntry from './CategoryEntry.js';
import Star from '../Star/Star.js';
import CategoriesContainer from './CategoriesContainer';
import ColorPicker from './ColorPicker.js';
import * as PopupConstants from '../../constants/PopupConstants.js';

function getState(){
  return{
    showColorPicker: false
  }
}

class PopupCategories extends Component {
  constructor(props) {
    super(props);
  }

  getBody() {
    var numCats = Object.keys(this.props.categoriesAndPages.categories).length;
    if (this.state.showColorPicker) {
      return <ColorPicker/>;
    }
    else if (numCats) {
      return <CategoriesContainer numCats={numCats}/>;
    }
  }

  render () {
    return (
      <div className="container popup-body electric-blue">
      </div>
    )
    return (
      <div className="container popup-body electric-blue">
        <div className='popup-page-title'>
          <p className="hide-overflow">{this.props.currentPage.title}</p>
          <Star/>
        </div>
        <div className="popup-main-form">
        <CategoryEntry/>
          {this.getBody()}
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    currentPage : state.currentPage,
    categoriesAndPages: state.categoriesAndPages,
    currentUser : state.currentUser,
    popupSelection: state.popupSelection
})

let mapDispatchToProps = (dispatch) => {
  return {
    popup_actions : bindActionCreators(PopupActions, dispatch),
    categories_pages_actions: bindActionCreators(CategoriesPagesActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupCategories);
