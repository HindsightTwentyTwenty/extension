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
import * as LookBackSections from '../../constants/LookBackConstants.js'
import * as LookbackActions from '../../actions/App/LookbackActions.js';
import * as UserActions from '../../actions/User/UserActions.js';

class App extends Component {

  constructor(props) {
    super(props);
    if(this.props.currentUser.token.length == 0){
      console.log("fetching token from chrome");
      chrome.storage.local.get("hindsite-token", this.props.user_actions.receiveUserTokenFromChrome);
    }
  }

  renderContent(){
    if(this.props.currentUser.token.length != 0){
      switch(this.props.lookbackNav.selection){
        case LookBackSections.LookBack:
          return (
            <div>
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
        <div id="here" className="app-container">
          <LookBackNavBar />
        </div>
        { this.renderContent() }
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    lookbackNav : state.lookbackNav,
    currentUser : state.currentUser
})

let mapDispatchToProps = (dispatch) => {
  return {
    lookback_actions: bindActionCreators(LookbackActions, dispatch),
    user_actions: bindActionCreators(UserActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
