import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as LookbackActions from '../../actions/App/LookbackActions.js';

class AppBaseComponent extends Component {

  constructor(props) {
    super(props);
    this.props.lookback_actions.fetchPages();
  }

  render() {
    if (this.props.pages) {
      var pages = this.props.pages.map(function (page){
          return (
            <div>{page.url}</div>
          );
      });
    }
    return (
      <div>
        <p>These are your pages:</p>
        <button onClick={() => {
          this.props.lookback_actions.fetchPages();
          }}>
        Get All Entries</button>
        <div className="pageList">
          {pages}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AppBaseComponent);
