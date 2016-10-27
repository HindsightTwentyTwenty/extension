import React, { PropTypes, Component } from 'react'
import {render} from 'react-dom';
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux'
import TabsComponent from './TabsComponent.js';
import { tabActions } from '../../actions/Tab/tabActions';

class Tab extends Component {


  render () {
    return (
      <div>
        <p> Hello React! hi grace! what what </p>
        <TabsComponent />
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
  }
}

let mapDispatchToProps = () => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tab);
