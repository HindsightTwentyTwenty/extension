import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as PopupActions from '../../actions/Popup/PopupActions.js';
import CategoryEntry from './CategoryEntry.js';
import Star from '../Star/Star.js';

var state = {};

class PopupBody extends Component {
  constructor(props) {
    super(props);
    this.props.popup_actions.fetchCategories();
  }

  componentDidMount() {
    chrome.tabs.query({active: true, currentWindow: true},function(tabs){
      state.currentUrl = tabs[0].url;
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
        <p>Current url: {state.currentUrl}</p>
        <p>Categorize this page!</p>
        <br/>
        <hr/>
        <Star currentUrl={state.currentUrl}/>
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
