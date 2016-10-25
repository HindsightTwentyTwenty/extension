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
      <div className="container">
        <div className="row popup-header">
          <div className="col-xs-8">
            <h1 className="popup-header-text">hindsite</h1>
          </div>
          <div className="col-xs-4 btn-wrapper">
            <div><button className="btn btn-sm lookback-btn" onClick={this.openTab.bind(this)}>lookback</button></div>
          </div>
        </div>
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
