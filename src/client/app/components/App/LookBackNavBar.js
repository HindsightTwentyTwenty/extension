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
      if(newLookBackSelection != this.props.currentLookBackSelection){
        document.getElementById("nav-bar-button-" + this.props.currentLookBackSelection).classList.remove('nav-bar-button-selected');
        this.props.lookback_nav_actions.switchLookBackSelection(newLookBackSelection)
        document.getElementById("nav-bar-button-" + newLookBackSelection).classList.add('nav-bar-button-selected');
      }
  }

  render() {
    return (
      <div id="navBar" className="container">
        <div className ="row">
          <div className="col-xs-3">
            <input type="text" className="form-control" placeholder="Search..." ref={node => {
              this.input = node;
            }} />
          </div>
          <div className="col-xs-9">
            <div className="btn-toolbar">
              <button id="nav-bar-button-0" className="btn btn-default nav-bar-button nav-bar-button-selected" type="button" onClick={() => {
                this.switchLookBackSelection(LookBackSections.LookBack);
              }}>lookback</button>
              <button id="nav-bar-button-1" className="btn btn-default nav-bar-button" type="button" onClick={() => {
                this.switchLookBackSelection(LookBackSections.Categories);
              }}>categories</button>
              <button id="nav-bar-button-2" className="btn btn-default nav-bar-button" type="button" onClick={() => {
                this.switchLookBackSelection(LookBackSections.Manage);
              }}>manage</button>
              <button id="nav-bar-button-3" className="btn btn-default nav-bar-button" type="button" onClick={() => {
                this.switchLookBackSelection(LookBackSections.Find);
              }}>find</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  currentLookBackSelection: state.currentLookBackSelection
})

let mapDispatchToProps = (dispatch) => {
  return {
    lookback_nav_actions: bindActionCreators(LookBackNavActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LookBackNavBar);
