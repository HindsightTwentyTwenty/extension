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
    this.state = {};
    this.props.popup_actions.fetchCategories();


    chrome.tabs.query({active: true, currentWindow: true},function(tabs){
      _this.state.currentUrl = tabs[0].url;
      _this.state.currentTitle = tabs[0].title;
      _this.state.urlInfo = _this.props.popup_actions.getPageCategories(_this.state.currentUrl);
      console.log("my categories: ", _this.state.urlInfo);
    });
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
      <div>
        <p>Current Page: {this.state.currentTitle}</p>
        <p>Categorize this page!</p>
        <br/>
        <hr/>
        <Star currentUrl={this.state.currentUrl}/>
        <CategoryEntry/>
        <br/>
        <hr/>
        <button onClick={() => {
          this.props.popup_actions.fetchCategories();
          }}>
        Get All Entries</button>
        <p>These are your categories:</p>
        <div>{categoryList}</div>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    categories : state.categories
})

let mapDispatchToProps = (dispatch) => {
  return {
    popup_actions: bindActionCreators(PopupActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupBody);
