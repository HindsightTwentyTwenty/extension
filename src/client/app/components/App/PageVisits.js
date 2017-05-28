import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {LineChart, Line, XAxis, YAxis, CartesianGrid,
        ResponsiveContainer, Tooltip, Legend} from 'recharts';
import * as UserActions from '../../actions/User/UserActions.js';
import * as AnalyticsActions from '../../actions/Analytics/AnalyticsActions.js';

class PageVisits extends Component {

  constructor(props) {
    super(props);
  }

  getData() {
    switch (this.props.analytics.range.length) {
      case 'day':
        return this.props.analytics.page_visits.day;
      case 'week':
        switch (this.props.analytics.range.type) {
          case 'current':
            return this.props.analytics.page_visits.week.current;
          case 'last':
            return this.props.analytics.page_visits.week.last;
          case 'average':
            return this.props.analytics.page_visits.week.average;
          }
      case 'month':
        return this.props.analytics.page_visits.month;
    }
  }

  weekType() {
    switch (this.props.analytics.range.type) {
      case 'current':
        return "Current Week's";
      case 'last':
        return "Last Week's";
      case 'average':
        return "Average Week's";
      default:
        return "Current Week's";
    }
  }

  sectionHeader() {
    switch (this.props.analytics.range.length) {
      case 'day':
        return (
          <h4>Today&#39;s</h4>
        );
      case 'week':
        return (
          <div className="btn-group">
            <button type="button" className="analytics-btn-dropdown btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {this.weekType()} <span className="caret"></span>
            </button>
            <ul className="dropdown-menu">
              <li><a onClick={() => {
                this.props.analytics_actions.changeRange('week','current');
              }}>Current Week&#39;s</a></li>
              <li><a onClick={() => {
                this.props.analytics_actions.changeRange('week','last');
              }}>Last Week&#39;s</a></li>
              <li><a onClick={() => {
                this.props.analytics_actions.changeRange('week','average');
              }}>Average Week&#39;s</a></li>
            </ul>
          </div>
        );
      case 'month':
        return (
          <h4>Current Month&#39;s</h4>
        );
      default:
        return (
          <h4>Current Week&#39;s</h4>
        );
      }
  }

  render() {
    return (
      <div className="page-visits">
        <div className="analytics-title">
          {this.sectionHeader()}
          <h4>&nbsp;Page Visits</h4>
        </div>
        <ResponsiveContainer width="100%" height="88%">
          <LineChart data={this.getData()}
            margin={{top: 10, right: 70, left: 0, bottom: 5}}>
           <XAxis dataKey={'datetime'}/>
           <YAxis/>
           <Tooltip/>
           <Line type="monotone" dataKey="pagevisits" name="Pages Visited" stroke="#53D1C8" activeDot={{r: 5}}/>
           <Line type="monotone" dataKey="pages" name="Unique Pages" stroke="#FFDD43" activeDot={{r: 5}}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
	currentUser : state.currentUser,
  analytics : state.analytics
})


let mapDispatchToProps = (dispatch) => ({
    user_actions: bindActionCreators(UserActions, dispatch),
    analytics_actions: bindActionCreators(AnalyticsActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PageVisits);
