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
    return (
      <div>
        <input type="checkbox" id="star" checked={checkedVal} ref={node => {
            this.input = node;
          }}
          onChange={() => {
            this.props.star_actions.toggleStar( this.props.currentPage.url, this.input.checked);
          }}
        />
        <label>Star</label>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    currentPage : state.currentPage
})

let mapDispatchToProps = (dispatch) => ({
    star_actions: bindActionCreators(StarActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Star);
