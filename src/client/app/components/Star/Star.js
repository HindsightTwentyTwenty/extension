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
    var classname = classNames('star-div', this.props.className);
    return (
      <div className={classname}>
        <i className={starred}
          onClick={() => {
            this.props.star_actions.toggleStar(this.props.currentPage, this.props.currentUser.token);
          }}
        ></i>
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
