import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import RangeSelector from './RangeSelector.js';
import PageVisits from './PageVisits.js';
import TopDomains from './TopDomains.js';
import TopPages from './TopPages.js';
import * as UserActions from '../../actions/User/UserActions.js';
import * as AnalyticsActions from '../../actions/Analytics/AnalyticsActions.js';


class Analytics extends Component {

  constructor(props) {
    super(props);
    if(this.props.analytics.page_visits.month.length == 0){
      this.props.analytics_actions.getAnalytics(this.props.currentUser.token);
    }
  }

  render() {
    return (
      <div className="analytics">
        <RangeSelector/>
        <div className="analytics-boxes">
          <PageVisits/>
          <TopDomains/>
          <TopPages/>
          
        </div>
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
