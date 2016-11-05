import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as LookbackActions from '../../actions/App/LookbackActions.js';

class TabsComponent extends Component {

  constructor(props) {
    super(props);
    this.props.lookback_actions.fetchPages();
  }
  // <button onClick={() => {
  //   this.props.lookback_actions.fetchPages();
  //   }}>
  // Get All Entries</button>
  

  render() {
    return (
      <div>
        <h1>HI GUYS </h1>

        <p>These are your pages:</p>
      </div>
    );
  }

}

let mapStateToProps = (state) => ({
    pages : state.pages
})

let mapDispatchToProps = (dispatch) => {
  return {
    lookback_actions: bindActionCreators(LookbackActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabsComponent);
