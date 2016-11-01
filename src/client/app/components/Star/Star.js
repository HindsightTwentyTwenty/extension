import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as StarActions from '../../actions/Star/StarActions.js';

var state = {};
class Star extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    chrome.tabs.query({active: true, currentWindow: true},function(tabs){
      state.currentUrl = tabs[0].url;
    });
  }

  render () {
    return (
      <div>
        <input type="checkbox" id="star" ref={node => {
            this.input = node;
          }}
          onChange={() => {
            this.props.star_actions.toggleStar( state.currentUrl, this.input.checked);
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
