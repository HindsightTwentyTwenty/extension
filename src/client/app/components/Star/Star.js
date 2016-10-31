import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as StarActions from '../../actions/Star/StarActions.js';

var state = {};
class Star extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUrl : ""
    };
  }

  componentDidMount() {
    var url;
    chrome.extension.sendMessage({greeting: "GetURL"}, function (response) {
        url = response.navURL;
    });
    console.log("currentURL in did mount: ", this.state.currentUrl);
  }

  render () {
    return (
      <div>
        <input type="checkbox" id="star" ref={node => {
            this.input = node;
          }}
          onChange={() => {
            this.props.star_actions.toggleStar( this.state.currentUrl, this.input.checked);
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
