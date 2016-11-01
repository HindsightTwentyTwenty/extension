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
    return (
      <div>
        <input type="checkbox" id="star" ref={node => {
            this.input = node;
          }}
          onChange={() => {
            this.props.star_actions.toggleStar( this.props.currentUrl, this.input.checked);
          }}
        />
        <label>Star</label>
      </div>
    )
  }
}

let mapDispatchToProps = (dispatch) => ({
    star_actions: bindActionCreators(StarActions, dispatch)
})

export default connect(null, mapDispatchToProps)(Star);
