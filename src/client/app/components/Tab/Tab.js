import React, { PropTypes, Component } from 'react'
import {render} from 'react-dom';
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux'
import TabsComponent from './TabsComponent.js';
// import { tabActions } from '../../actions/Tab/tabActions';

class Tab extends Component {
  getTabs(){
    this.props.
    this.props.tabActions
  }


  render () {
    return (
      <div>
      {this.props.tabs}
      {this.getTabs()}
        <p> Hello React! hi grace! what what </p>
        <TabsComponent />
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    tabs : state.tabs
  }
}

let mapDispatchToProps = () => {
  return {
    newtab : tabActions.newtab
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tab);
