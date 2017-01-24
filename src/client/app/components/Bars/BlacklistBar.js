import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as BlacklistActions from '../../actions/Blacklist/BlacklistActions.js';

class BlacklistBar extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='blacklist-bar'>
        <label className='blacklist-bar-label hide-overflow'> {this.props.title} </label>
        <div className='blacklist-bar-info'>
          <label className='blacklist-bar-label hide-overflow'> since {this.props.created} </label>
          <div className='blacklist-button remove' onClick={()=>{
            }}>
            <i className={'fa fa-times fa-2x'}></i>
          </div>
          <div className='blacklist-button edit' onClick={()=>{
            }}>
            <i className={'fa fa-pencil-square-o fa-2x'}></i>
          </div>
        </div>
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
