import React, { PropTypes, Component } from 'react'
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as PopupActions from '../../actions/Popup/PopupActions.js';
import * as UserActions from '../../actions/User/UserActions.js';
import * as PopupConstants from '../../constants/PopupConstants.js';
import ReactTooltip from 'react-tooltip';

import Toggle from 'react-toggle'
import 'react-toggle/style.css';

class PopupHeader extends Component {
  constructor(props) {
    super(props);
  }

  openTab () {
    if(this.props.currentUser.token.length){
      chrome.tabs.create({'url': chrome.extension.getURL('/app/main.html')}, function(tab){
      });
    }
  }

  toggleChange(event) {
    this.props.user_actions.toggleTracking(event.target.checked, this.props.currentUser.token);
  }

  render () {
    return (
      <div className="popup-header-wrapper">
        <div className="popup-header" onMouseDown={()=>{this.openTab()}}>
            <img className="header-height logo zero-margin"  src="../../assets/img/logo-light.png"/>
            <div id="logo-text-wrap">
              <p className="header-height popup-header-text">hindsite</p>
              <p id="go-to-timeline"> go to timeline</p>
            </div>
        </div>

        <div id="tracking-toggle-wrapper">
          <ReactTooltip place="left" effect="solid" />
          <i className="fa fa-question-circle fa-lg"
             id="tracking-explanation"
             data-tip="Keep on to save browsing history" aria-hidden="true"></i>
          <span id="tracking-toggle-label">Autosave: </span>
          <Toggle id="tracking-toggle"
            onChange={ this.toggleChange.bind(this) }
            className={ "popup-tracking-toggle"}
            checked={ this.props.currentUser.tracking_on }/>
        </div>
      </div>

    )
  }
}

let mapStateToProps = (state) => ({
    pages : state.pages,
    currentUser : state.currentUser
})

let mapDispatchToProps = (dispatch) => ({
    user_actions: bindActionCreators(UserActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PopupHeader);
