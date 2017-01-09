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
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      this.props.popup_actions.getPageInfo(tabs[0].url);
    });
    this.props.category_actions.fetchCategories();
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
      return (
        <div className="container popup-body">
          <div className="row">
            <div className="col-xs-10">
              <h3 className="hide-overflow">{this.props.currentPage.title}</h3>
            </div>
            <div className="col-xs-2">
              <Star/>
            </div>
          </div>
          <div className="row">
            <hr/>
          </div>
          <div className="row">
              <CategoryEntry popup={true}/>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <h4>recent categories</h4>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <CategoriesContainer all={true}/>
            </div>
          </div>
        </div>
      )
    }

  }
}

let mapStateToProps = (state) => ({
    currentPage : state.currentPage,
    categories: state.categories
})

let mapDispatchToProps = (dispatch) => {
  return {
    popup_actions : bindActionCreators(PopupActions, dispatch),
    category_actions: bindActionCreators(CategoryActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupBody);
