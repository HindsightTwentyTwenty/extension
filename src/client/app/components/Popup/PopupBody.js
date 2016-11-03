import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as PopupActions from '../../actions/Popup/PopupActions.js';
import CategoryEntry from './CategoryEntry.js';
import Star from '../Star/Star.js';


class PopupBody extends Component {
  constructor(props) {
    super(props);
    var _this = this;
    chrome.tabs.query({active: true, currentWindow: true},function(tabs){
      _this.props.popup_actions.getPageInfo(tabs[0].url);
    });
    this.props.popup_actions.fetchCategories();
  }

  render () {
    if (this.props.categories) {
      var categoryList =
        <ul>
          {this.props.categories.map(category =>
            <li key={category.title}>{category.title}</li>
          )}
        </ul>
      };
    return (
      <div className="container popup-body">
        <div className="row">
          <div className="col-xs-10">
            <h3>{this.props.currentPage.title}</h3>
          </div>
          <div className="col-xs-2">
            <Star/>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <h4>categorize this page:</h4>
          </div>
        </div>
        <div className="row">
          <hr/>
        </div>
        <div className="row">
            <CategoryEntry/>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <p>These are your categories:</p>
            <div>{categoryList}</div>
          </div>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    currentPage : state.currentPage,
    categories: state.categories
})

let mapDispatchToProps = (dispatch) => {
  return {
    popup_actions : bindActionCreators(PopupActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupBody);
