import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as BlacklistActions from '../../actions/Blacklist/BlacklistActions.js';

class BlacklistBar extends Component {

  constructor(props) {
    super(props);
  }

  formatDate() {
    var date = new Date(this.props.created);
    return (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear();
   }

  render() {
    return (
      <div className='blacklist-bar'>
        <label className='blacklist-bar-label hide-overflow'> {this.props.title} </label>
        <div className='blacklist-bar-info'>
          <label className='blacklist-bar-label hide-overflow'> since {this.formatDate()} </label>
          <div className='blacklist-button' onClick={()=>{
            this.props.blacklist_actions.removeFromBlacklist(this.props.pk, this.props.currentUser.token);
            }}>
            <i className={'fa fa-times fa-2x'}></i>
          </div>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    blacklist : state.blacklist,
    currentUser : state.currentUser
})

let mapDispatchToProps = (dispatch) => ({
  blacklist_actions: bindActionCreators(BlacklistActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(BlacklistBar);
