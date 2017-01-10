import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as LookBackNavActions from '../../actions/LookBackNav/LookBackNavActions.js';
import * as LookBackSections from '../../constants/LookBackConstants.js'

class LookBackNavBar extends Component {

  constructor(props) {
    super(props);
  }


  switchLookBackSelection(newLookBackSelection){
    console.log("nav-bar-button-" + this.props.currentLookBackSelection);
      if(newLookBackSelection != this.props.currentLookBackSelection){
        document.getElementById("nav-bar-button-" + this.props.currentLookBackSelection).classList.remove('nav-bar-button-selected');
        this.props.lookback_nav_actions.switchLookBackSelection(newLookBackSelection)
        document.getElementById("nav-bar-button-" + newLookBackSelection).classList.add('nav-bar-button-selected');
      }
  }

  logoutUser(){
    console.log("logout");
    chrome.storage.local.remove("hindsite-token");
    this.props.login_actions.logoutUser();
    chrome.tabs.getCurrent(function(tab) {
      chrome.tabs.remove(tab.id, function() { });
    });
  }

  render() {
    console.log("currentLookBackSelection", this.props.currentLookBackSelection);
    return (
      <div id="navBar" className="nav-bar-container">
        <div className="nav-menu-bar">
          <input type="text" className="search-bar" placeholder="Search..." ref={node => {
            this.input = node;
          }} />
          <div className="btn-toolbar">
            <button id="nav-bar-button-0" className="nav-bar-button nav-bar-button-selected" type="button" onClick={() => {
              this.switchLookBackSelection(LookBackSections.LookBack);
            }}>lookback</button>
            <button id="nav-bar-button-1" className="nav-bar-button" type="button" onClick={() => {
              this.switchLookBackSelection(LookBackSections.Categories);
            }}>categories</button>
            <button id="nav-bar-button-2" className="nav-bar-button" type="button" onClick={() => {
              this.switchLookBackSelection(LookBackSections.Manage);
            }}>manage</button>
            <button id="nav-bar-button-3" className="nav-bar-button" type="button" onClick={() => {
              this.switchLookBackSelection(LookBackSections.Find);
            }}>find</button>
            <button id="nav-bar-button-4" className="nav-bar-button" type="button" onClick={() => {
              this.logoutUser.bind(this);
            }}>LOGOUT</button>
          </div>
        </div>
        <div className="site-title">hindsite</div>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  currentLookBackSelection: state.currentLookBackSelection,
  currentUser : state.currentUser

})

let mapDispatchToProps = (dispatch) => {
  return {
    lookback_nav_actions: bindActionCreators(LookBackNavActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LookBackNavBar);
