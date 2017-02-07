import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as LookBackNavActions from '../../actions/LookBackNav/LookBackNavActions.js';
import * as LookbackActions from '../../actions/App/LookbackActions.js';
import * as LookBackSections from '../../constants/LookBackConstants.js'
import moment from 'moment';

class LookBackNavBar extends Component {

  constructor(props) {
    super(props);

  }

  searchBarInput(event){
    var keycode = event.keyCode || event.which;
    if(keycode == '13') {
        var search_term = event.target.value;
        this.props.lookback_actions.searchTerm(search_term, moment().subtract(2, 'year').format(), moment().format(), this.props.currentUser.token);
    }
  }



  switchLookBackSelection(newLookBackSelection){
      if(newLookBackSelection != this.props.lookbackNav.selection){
        this.props.lookback_nav_actions.switchLookBackSelection(newLookBackSelection, "")
      }
  }

  searchForm() {
    if (this.props.lookbackNav.selection == LookBackSections.Search){
      return (
        <div>
        <button id="nav-bar-button-3" className="nav-bar-button nav-bar-button-selected" type="button" disabled>advanced search</button>
        </div>
      )
    } else {
      return (
        <div>
          <input type="text" className="search-bar" placeholder="Search..." onKeyPress={this.searchBarInput.bind(this)} />
        </div>
      )
    }
  }

  render() {
    return (
      <div id="navBar" className="nav-bar-container">
        <div className="nav-menu-bar">
          { this.searchForm() }
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
  lookbackNav: state.lookbackNav,
  currentUser : state.currentUser

})

let mapDispatchToProps = (dispatch) => {
  return {
    lookback_nav_actions: bindActionCreators(LookBackNavActions, dispatch),
    lookback_actions: bindActionCreators(LookbackActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LookBackNavBar);
