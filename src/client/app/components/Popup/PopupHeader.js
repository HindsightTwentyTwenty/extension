import React, { PropTypes, Component } from 'react'
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as PopupActions from '../../actions/Popup/PopupActions.js';

class PopupHeader extends Component {
  constructor(props) {
    super(props);
  }

  openTab () {
    chrome.tabs.create({'url': chrome.extension.getURL('/app/main.html')}, function(tab){
    });
  }

  render () {
    return (
      <div>
        <h1>hindsite</h1>
        <div><button onClick={this.openTab.bind(this)}>lookback</button></div>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    pages : state.pages
})

let mapDispatchToProps = (dispatch) => ({
    popup_actions: bindActionCreators(PopupActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PopupHeader);
