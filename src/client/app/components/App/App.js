import React, { PropTypes, Component } from 'react'
import {render} from 'react-dom';
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux'
import AppBaseComponent from './AppBaseComponent.js';
import LookBack from './LookBack.js';
import LookBackNavBar from './LookBackNavBar.js';
import CategoriesPage from './CategoriesPage.js';
import Manage from './Manage.js';
import Search from './Search.js';
import Analytics from './Analytics.js';
import * as LookBackSections from '../../constants/LookBackConstants.js'
import * as LookbackActions from '../../actions/App/LookbackActions.js';
import * as UserActions from '../../actions/User/UserActions.js';

class App extends Component {

  constructor(props) {
    super(props);
    if(this.props.currentUser.token.length == 0 || this.props.currentUser.md5.length == 0 || this.props.currentUser.ekey.length == 0){
        chrome.storage.local.get(["hindsite-token", "md5", "ekey"], this.props.user_actions.receiveFromChrome);
    }
  }

  renderContent(){
    if(this.props.currentUser.token.length != 0){
      switch(this.props.appNav.menuSelection){
        case LookBackSections.LookBack:
          return (
            <div id= "lookback-content">
              <AppBaseComponent />
              <LookBack />
            </div>
          );
        case LookBackSections.Categories:
          return (
            <CategoriesPage />
          );
        case LookBackSections.Manage:
          return (
            <Manage />
          );
        case LookBackSections.Search:
          return (
            <Search />
          );
        case LookBackSections.Analytics:
          return (
            <Analytics />
          );
        default:
          return (
            <div>
            <AppBaseComponent />
            <LookBack />
            </div>
          );
      }
    }
  }


  render () {
    return (
      <div>
        <div className="app-container">
          <LookBackNavBar />
        </div>
        <div id="content-body">
          { this.renderContent() }
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    appNav : state.appNav,
    currentUser : state.currentUser
})

let mapDispatchToProps = (dispatch) => {
  return {
    lookback_actions: bindActionCreators(LookbackActions, dispatch),
    user_actions: bindActionCreators(UserActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
