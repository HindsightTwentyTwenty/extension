import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as PopupActions from '../../actions/Popup/PopupActions.js';
import CategoryEntry from './CategoryEntry.js';
import Star from '../Star/Star.js';
import CategoryContainer from './CategoryContainer';

class PopupBody extends Component {
  constructor(props) {
    super(props);
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      this.props.popup_actions.getPageInfo(tabs[0].url);
    });
    this.props.popup_actions.fetchCategories();
  }

  render () {
    return (
      <div className="container popup-body">
        <div className="row">
          <div className="col-xs-10 hideoverflow">
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
            <CategoryContainer/>
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
