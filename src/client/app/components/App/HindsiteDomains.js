import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UserActions from '../../actions/User/UserActions.js';
import * as AnalyticsActions from '../../actions/Analytics/AnalyticsActions.js';
import {COLORS} from '../../constants/AnalyticsConstants.js';

class HindsiteDomains extends Component {

  constructor(props) {
    super(props);
  }

  sectionHeader() {
    switch (this.props.analytics.range.length) {
      case 'day':
        return (
          <h4>Today&#39;s Top Domains on hindsite</h4>
        );
      case 'week':
        return (
          <h4>This Week&#39;s Top Domains on hindsite</h4>
        );
      case 'month':
        return (
          <h4>This Month&#39;s Top Domains on hindsite</h4>
        );
      default:
        return (
          <h4>This Week&#39;s Top Domains on hindsite</h4>
        );
      }
  }

  range() {
    switch (this.props.analytics.range.length) {
      case 'day':
        return 'today';
      case 'week':
        return 'this week';
      case 'month':
        return 'this month';
      default:
        return 'this week';
      }
  }

  getDomains() {
    switch (this.props.analytics.range.length) {
      case 'day':
        return this.props.analytics.hindsite_domains.day;
      case 'week':
        return this.props.analytics.hindsite_domains.week;
      case 'month':
        return this.props.analytics.hindsite_domains.month;
      default:
        return this.props.analytics.hindsite_domains.week;
      }
  }

  firstfivelist(domains) {
    if (domains.length > 0) {
      return (
        <div className="left-five-list" style={{float: 'left'}}>
          <div className="list-element">{'1. ' + domains[0].name}</div>
          {domains[1] ?
            <div className="list-element">{'2. ' + domains[1].name}</div> :
            <div className="list-element">{' '}</div>
          }
          {domains[2] ?
            <div className="list-element">{'3. ' + domains[2].name}</div> :
            <div className="list-element">{' '}</div>
          }
          {domains[3] ?
            <div className="list-element">{'4. ' + domains[3].name}</div> :
            <div className="list-element">{' '}</div>
          }
          {domains[4] ?
            <div className="list-element">{'5. ' + domains[4].name}</div> :
            <div className="list-element">{' '}</div>
          }
        </div>
      )
    } else {
      return (
        <div className="none-visited">
          Not enough data yet {this.range()}.
        </div>
      )
    }
  }

  secondfivelist(domains) {
    if (domains.length > 0) {
      return (
        <div className="right-five-list">
          {domains[0] ?
            <div className="list-element" >{'6. ' + domains[0].name}</div> :
            <div className="list-element">{' '}</div>
          }
          {domains[1] ?
            <div className="list-element">{'7. ' + domains[1].name}</div> :
            <div className="list-element">{' '}</div>
          }
          {domains[2] ?
            <div className="list-element">{'8. ' + domains[2].name}</div> :
            <div className="list-element">{' '}</div>
          }
          {domains[3] ?
            <div className="list-element">{'9. ' + domains[3].name}</div> :
            <div className="list-element">{' '}</div>
          }
          {domains[4] ?
            <div className="list-element">{'10. ' + domains[4].name}</div> :
            <div className="list-element">{' '}</div>
          }
        </div>
      )
    }
  }

  render() {
    return (
      <div className="hindsite-domains">
        <div className="analytics-title">
          {this.sectionHeader()}
        </div>
        <div className="hindsite-top-list">
          {this.firstfivelist(this.getDomains().slice(0, 5))}
          {this.secondfivelist(this.getDomains().slice(5, 10))}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HindsiteDomains);
