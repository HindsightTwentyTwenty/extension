import React, { PropTypes, Component } from 'react'
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as PopupActions from '../../actions/Popup/PopupActions.js';
import * as PopupConstants from '../../constants/PopupConstants.js';

class PopupHeader extends Component {
  constructor(props) {
    super(props);
  }

  openTab () {
    if(this.props.currentUser.token.length != 0){
      chrome.tabs.create({'url': chrome.extension.getURL('/app/main.html')}, function(tab){
      });
    }
  }

  render () {
    return (
      <div className="popup-header">
        <h1 className="popup-header-text">hindsite</h1>
        <button className="lookback-btn watermelon" onClick={this.openTab.bind(this)}>lookback</button>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    pages : state.pages,
    currentUser : state.currentUser
})

export default connect(mapStateToProps, null)(PopupHeader);
