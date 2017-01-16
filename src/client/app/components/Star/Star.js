import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as StarActions from '../../actions/Star/StarActions.js';

class Star extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    var checkedVal = this.props.currentPage.star;
    var starred = checkedVal ? 'fa fa-star fa-2x star' : 'fa fa-star fa-2x star hidden';
    var unstarred = checkedVal ? 'fa fa-star-o fa-2x star hidden' : 'fa fa-star-o fa-2x star'
    return (
      <div className="star-div">
        <i className={starred} id='starred'
          onClick={() => {
            checkedVal = !checkedVal
            this.props.star_actions.toggleStar( this.props.currentPage.url, checkedVal, this.props.currentUser.token);
          }}
        ></i>
        <i className={unstarred} id='unstarred'
          onClick={() => {
            checkedVal = !checkedVal
            this.props.star_actions.toggleStar( this.props.currentPage.url, checkedVal, this.props.currentUser.token);
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
