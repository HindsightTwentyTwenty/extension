import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as AnalyticsActions from '../../actions/Analytics/AnalyticsActions.js';


class RangeSelector extends Component {

  constructor(props) {
    super(props);
  }


  getClassName(range) {
    if (this.props.analytics.range == range) {
      return "active";
    }
  }


  render() {
    return (
      <ul className="nav nav-pills range-selector">
        <li role="presentation" className={this.getClassName('day')}><a onClick={() => {
          this.props.analytics_actions.changeRange('day');
        }}>Day</a></li>
        <li role="presentation" className={this.getClassName('week')}><a onClick={() => {
          this.props.analytics_actions.changeRange('week');
        }}>Week</a></li>
        <li role="presentation" className={this.getClassName('month')}><a onClick={() => {
          this.props.analytics_actions.changeRange('month');
        }}>Month</a></li>
      </ul>
    )
  }

}

let mapStateToProps = (state) => ({
	currentUser : state.currentUser,
  analytics : state.analytics
})

let mapDispatchToProps = (dispatch) => ({
    analytics_actions: bindActionCreators(AnalyticsActions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(RangeSelector);
