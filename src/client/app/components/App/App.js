import React, { PropTypes, Component } from 'react'
import {render} from 'react-dom';
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux'
import AppBaseComponent from './AppBaseComponent.js';
import LookBack from './LookBack.js';
import LookBackNavBar from './LookBackNavBar.js';
import CategoriesPage from './CategoriesPage.js';
import Manage from './Manage.js';
import Find from './Find.js';
import * as LookBackSections from '../../constants/LookBackConstants.js'

import * as LookbackActions from '../../actions/App/LookbackActions.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.props.lookback_actions.fetchPages(this.props.currentUser.token);
  }

  renderContent(){
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
      case LookBackSections.Find:
        return (
          <Find />
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
    lookback_actions: bindActionCreators(LookbackActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
