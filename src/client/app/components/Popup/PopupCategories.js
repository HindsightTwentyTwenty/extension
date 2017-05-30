import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';
import * as PopupActions from '../../actions/Popup/PopupActions.js';
import CategoryEntry from './CategoryEntry.js';
import Star from '../Star/Star.js';
import CategoriesContainer from './CategoriesContainer';
import ColorPicker from './ColorPicker.js';
import * as PopupConstants from '../../constants/PopupConstants.js';

class PopupCategories extends Component {
  constructor(props) {
    super(props);
  }

  getBody() {
    console.log("this.state", this.props);
    if (this.props.categories.showColorPicker) {
      return <ColorPicker/>;
    }
    else if (Object.keys(this.props.categories.cats).length) {
      return <CategoriesContainer numCats={Object.keys(this.props.categories.cats).length} onSelect={this.props.category_actions.toggleCategory} useCase={"categorize"}/>;
    }
  }

  render () {
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
    categories: state.popupCategories,
    currentUser : state.currentUser,
    popupSelection: state.popupSelection
})

let mapDispatchToProps = (dispatch) => {
  return {
    popup_actions : bindActionCreators(PopupActions, dispatch),
    category_actions: bindActionCreators(CategoryActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupCategories);
