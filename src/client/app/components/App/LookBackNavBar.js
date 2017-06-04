import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as NavActions from '../../actions/App/NavActions.js';
import * as LookbackActions from '../../actions/App/LookbackActions.js';
import * as LookBackSections from '../../constants/LookBackConstants.js';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';

import moment from 'moment';

class LookBackNavBar extends Component {

  constructor(props) {
    super(props);

  }

  searchBarInput(event){
    var keycode = event.keyCode || event.which;
    if(keycode == '13') {
        var search_term = event.target.value;
        if(event.target.value.trim() != ""){
          this.props.lookback_actions.searchTermNav(search_term, this.props.currentUser.token);
        }
    }
  }



  switchMenuSelection(newMenuSelection){
    if(newMenuSelection != this.props.appNav.menuSelection){
      this.props.nav_actions.switchMenuSelection(newMenuSelection, "")
    }
  }

  searchForm() {
    if (this.props.appNav.menuSelection == LookBackSections.Search){
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

  onMenuSelect(){
    if(this.props.currentDomainDisplayed.clicked){
        this.props.lookback_actions.toggleDomainClicked();
        this.props.lookback_actions.setCurrentPage({});
    }
  }

  render() {
    return (
      <div id="navBar" className="nav-bar-container">
        <div className="nav-menu-bar">
          { this.searchForm() }
          <div className="btn-toolbar">
            <button id="nav-bar-button-0" className="nav-bar-button nav-bar-button-selected" type="button" onClick={() => {
              this.switchMenuSelection(LookBackSections.LookBack);
              this.onMenuSelect();
            }}>timeline</button>
            <button id="nav-bar-button-1" className="nav-bar-button" type="button" onClick={() => {
              this.switchMenuSelection(LookBackSections.Categories);
              this.onMenuSelect();
            }}>categories</button>
            <button id="nav-bar-button-3" className="nav-bar-button" type="button" onClick={() => {
              this.switchMenuSelection(LookBackSections.Analytics);
              this.onMenuSelect();
            }}>analytics</button>
            <button id="nav-bar-button-2" className="nav-bar-button" type="button" onClick={() => {
              this.switchMenuSelection(LookBackSections.Manage);
              this.onMenuSelect();
            }}>manage</button>
          </div>
        </div>
        <div className="site-title">
              <div className="app-header"
                onClick={() => {
                  this.switchMenuSelection(LookBackSections.LookBack);
                }}>
                <img className="logo site-logo"  src="../../assets/img/logo-light.png"/>
                <p className="popup-header-text">hindsite</p>
              </div>
          </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  appNav: state.appNav,
  currentUser : state.currentUser,
  currentDomainDisplayed: state.currentDomainDisplayed
})

let mapDispatchToProps = (dispatch) => {
  return {
    nav_actions: bindActionCreators(NavActions, dispatch),
    lookback_actions: bindActionCreators(LookbackActions, dispatch),
    category_actions: bindActionCreators(CategoryActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LookBackNavBar);
