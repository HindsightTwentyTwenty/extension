import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';
import * as LookbackActions from '../../actions/App/LookbackActions.js';

class PageBar extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.page);
  }

  render() {
    return (
      <div
        className="page-bar"
        style={this.props.style}
        onMouseOver={() => {
          this.props.lookback_actions.updateDisplayPage(this.props.page, true);
        }}
        onMouseLeave={() => {
          this.props.lookback_actions.updateDisplayPage(this.props.page, false);
        }}
        onMouseDonw={() => {
          this.props.lookback_actions.updateDisplayPage(this.props.page, true);
        }}>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    currentPageDisplayed: state.currentPageDisplayed,
})

let mapDispatchToProps = (dispatch) => ({
  lookback_actions: bindActionCreators(LookbackActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PageBar);
