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
    if (this.props.analytics.range.length == range) {
      return "active";
    }
  }


  render() {
    return (
      <ul className="nav nav-pills range-selector">
        <li role="presentation" className={this.getClassName('day')}><a onClick={() => {
          this.props.analytics_actions.changeRange('day', '');
          this.props.analytics_actions.activeUserDomain(null);
        }}>Day</a></li>
        <li role="presentation" className={this.getClassName('week')}><a onClick={() => {
          this.props.analytics_actions.changeRange('week', 'current');
          this.props.analytics_actions.activeUserDomain(null);
        }}>Week</a></li>
        <li role="presentation" className={this.getClassName('month')}><a onClick={() => {
          this.props.analytics_actions.changeRange('month', '');
          this.props.analytics_actions.activeUserDomain(null);
        }}>Month</a></li>
      </ul>
    )
  }

}

let mapStateToProps = (state) => ({
  analytics : state.analytics
})

let mapDispatchToProps = (dispatch) => ({
    analytics_actions: bindActionCreators(AnalyticsActions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(RangeSelector);
