import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as BlacklistActions from '../../actions/Blacklist/BlacklistActions.js';

class BlacklistBar extends Component {

  constructor(props) {
    super(props);
  }
  // put a regex on the blacklist box
  render() {
    return (
      <div
        className='blacklist-bar'
        <label className='blacklist-bar-label hide-overflow'> {this.props.blacklistSiteTitle} </label>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    blacklist : state.blacklist
})

let mapDispatchToProps = (dispatch) => ({
  blacklist_actions: bindActionCreators(BlacklistActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(BlacklistBar);
