import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as LookBackNavActions from '../../actions/LookBackNav/LookBackNavActions.js';
import * as LookbackActions from '../../actions/App/LookbackActions.js';
import * as LookBackSections from '../../constants/LookBackConstants.js'

class LookBackNavBar extends Component {

  constructor(props) {
    super(props);

  }

  searchBarInput(event){
    var keycode = event.keyCode || event.which;
    if(keycode == '13') {
        var search_term = event.target.value;
        this.props.lookback_actions.searchTerm(search_term, this.props.currentUser.token);
    }
  }



  switchLookBackSelection(newLookBackSelection){
      if(newLookBackSelection != this.props.currentLookBackSelection){
        this.props.lookback_nav_actions.switchLookBackSelection(newLookBackSelection)
      }
  }

  render() {
    return (
      <div id="navBar" className="nav-bar-container">
        <div className="nav-menu-bar">
          <input type="text" className="search-bar" placeholder="Search..." onKeyPress={this.searchBarInput.bind(this)} />
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
          </div>
        </div>
        <div className="site-title"
          onClick={() => {
            this.switchLookBackSelection(LookBackSections.LookBack);
          }}>hindsite</div>
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
    lookback_nav_actions: bindActionCreators(LookBackNavActions, dispatch),
    lookback_actions: bindActionCreators(LookbackActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LookBackNavBar);
