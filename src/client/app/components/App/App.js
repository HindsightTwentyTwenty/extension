import React, { PropTypes, Component } from 'react'
import {render} from 'react-dom';
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux'
import AppBaseComponent from './AppBaseComponent.js';
import LookBack from './LookBack.js';
import LookBackNavBar from './LookBackNavBar.js';
import CategoriesPage from './CategoriesPage.js';
import Manage from './Manage.js';
import * as LookBackSections from '../../constants/LookBackConstants.js'
import * as LookbackActions from '../../actions/App/LookbackActions.js';
import * as LoginActions from '../../actions/Popup/LoginActions.js';

class App extends Component {

  constructor(props) {
    super(props);
    if(this.props.currentUser.token.length == 0){
      console.log("fetching token from chrome");
      chrome.storage.local.get("hindsite-token", this.props.login_actions.receiveUserTokenFromChrome);
    }
  }

  renderContent(){
    if(this.props.currentUser.token.length != 0){
      switch(this.props.lookBackSelection){
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
    pages : state.pages,
    lookBackSelection : state.currentLookBackSelection,
    currentUser : state.currentUser
})

let mapDispatchToProps = (dispatch) => {
  return {
    lookback_actions: bindActionCreators(LookbackActions, dispatch),
    login_actions: bindActionCreators(LoginActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
