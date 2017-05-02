import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UserActions from '../../actions/User/UserActions.js';
import * as AnalyticsActions from '../../actions/Analytics/AnalyticsActions.js';


class TopPages extends Component {

  constructor(props) {
    super(props);
  }

  sectionHeader() {
    switch (this.props.analytics.range.length) {
      case 'day':
        return (
          <h4>Today&#39;s</h4>
        );
      case 'week':
        return (
          <h4>This Week&#39;s</h4>
        );
      case 'month':
        return (
          <h4>This Month&#39;s</h4>
        );
      default:
        return (
          <h4>This Week&#39;s</h4>
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

  getPages() {
    switch (this.props.analytics.range.length) {
      case 'day':
        return this.props.analytics.user_pages.day;
      case 'week':
        return this.props.analytics.user_pages.week;
      case 'month':
        return this.props.analytics.user_pages.month;
      default:
        return this.props.analytics.user_pages.week;
      }
  }

  fivelist(pages) {
    if (pages.length > 0) {
      return (
        <div className="page-five-list" style={{float: 'left'}}>
          <div className="list-element">
            <a target="_blank" href={pages[0].url}>{'1. ' + pages[0].title}</a>
          </div>
          {pages[1] ?
            <div className="list-element"><a target="_blank" href={pages[1].url}>{'2. ' + pages[1].title}</a></div> :
            <div className="list-element">{' '}</div>
          }
          {pages[2] ?
            <div className="list-element"><a target="_blank" href={pages[2].url}>{'3. ' + pages[2].title}</a></div> :
            <div className="list-element">{' '}</div>
          }
          {pages[3] ?
            <div className="list-element"><a target="_blank" href={pages[3].url}>{'4. ' + pages[3].title}</a></div> :
            <div className="list-element">{' '}</div>
          }
          {pages[4] ?
            <div className="list-element"><a target="_blank" href={pages[4].url}>{'5. ' + pages[4].title}</a></div> :
            <div className="list-element">{' '}</div>
          }
        </div>
      )
    } else {
      return (
        <div className="none-visited">
          You haven&#39;t visited any pages yet {this.range()}.
        </div>
      )
    }
  }

  render() {
    return (
      <div className="top-pages">
        <div className="analytics-title">
          {this.sectionHeader()}
          <h4>&nbsp;Top Pages</h4>
        </div>
        <div className="top-list">
          {this.fivelist(this.getPages())}
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

export default connect(mapStateToProps, mapDispatchToProps)(TopPages);
