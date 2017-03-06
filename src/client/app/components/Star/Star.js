import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as StarActions from '../../actions/Star/StarActions.js';
var classNames = require('classnames');
class Star extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    var starred = this.props.currentPage.star ? 'fa fa-star fa-2x star starred' : 'fa fa-star-o fa-2x star unstarred';
    var classname = classNames(this.props.className);
    return (
      <div className={classname} onClick={()=>{this.props.star_actions.toggleStar(true, this.props.currentPage, this.props.currentUser.token)}}>
        <i className={starred}></i>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    currentPage : state.currentPage,
    currentUser : state.currentUser
})

let mapDispatchToProps = (dispatch) => ({
    star_actions: bindActionCreators(StarActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Star);
