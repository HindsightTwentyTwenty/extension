import React, { PropTypes, Component } from 'react'
import {render} from 'react-dom';
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux'
import AppBaseComponent from './AppBaseComponent.js';
import LookBack from './LookBack.js';

import * as LookbackActions from '../../actions/App/LookbackActions.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.props.lookback_actions.fetchPages();
  }


  render () {
    return (
      <div>
        <div className="site-title">hindsite</div>
        <p> TODO : Replace with domain specific component </p>
        <AppBaseComponent />
        <LookBack />
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    pages : state.pages
})

let mapDispatchToProps = (dispatch) => {
  return {
    lookback_actions: bindActionCreators(LookbackActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
