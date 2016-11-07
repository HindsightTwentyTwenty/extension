import React, { PropTypes, Component } from 'react'
import {render} from 'react-dom';
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux'
import AppBaseComponent from './AppBaseComponent.js';
import LookBack from './LookBack.js';
import LookBackNavBar from './LookBackNavBar.js';
import Categories from './Categories.js';
import Manage from './Manage.js';
import Find from './Find.js';
import * as LookBackSections from '../../constants/LookBackConstants.js'

import * as LookbackActions from '../../actions/App/LookbackActions.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.props.lookback_actions.fetchPages();
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
          <div>
           <Categories />
          </div>
        );
      case LookBackSections.Manage:
        return (
          <div>
           <Manage />
          </div>
        );
      case LookBackSections.Find:
        return (
          <div>
           <Find />
          </div>
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
        <div className="site-title">hindsite</div>
        <LookBackNavBar />

        { this.renderContent() }

      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    pages : state.pages,
    lookBackSelection : state.currentLookBackSelection
})

let mapDispatchToProps = (dispatch) => {
  return {
    lookback_actions: bindActionCreators(LookbackActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
