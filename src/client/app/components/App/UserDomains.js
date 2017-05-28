import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { ResponsiveContainer, PieChart, Pie, Sector, Cell } from 'recharts';
import * as UserActions from '../../actions/User/UserActions.js';
import * as AnalyticsActions from '../../actions/Analytics/AnalyticsActions.js';
import {COLORS} from '../../constants/AnalyticsConstants.js';

function getState () {
  return {
    current_user_domain: null
  }
}

class UserDomains extends Component {

  constructor(props) {
    super(props);
    this.state = getState()
  }

  renderActive(props) {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
      return (
        <g>
          <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius+2}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
          />
        </g>
      );
  };

  sectionHeader() {
    switch (this.props.analytics.range.length) {
      case 'day':
        return (
          <h4>Today&#39;s Top Domains</h4>
        );
      case 'week':
        return (
          <h4>This Week&#39;s Top Domains</h4>
        );
      case 'month':
        return (
          <h4>This Month&#39;s Top Domains</h4>
        );
      default:
        return (
          <h4>This Week&#39;s Top Domains</h4>
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

  onPieEnter(data, index) {
    this.setState({current_user_domain: index})
  }

  getDomains() {
    switch (this.props.analytics.range.length) {
      case 'day':
        return this.props.analytics.user_domains.day;
      case 'week':
        return this.props.analytics.user_domains.week;
      case 'month':
        return this.props.analytics.user_domains.month;
      default:
        return this.props.analytics.user_domains.week;
      }
  }

  currentDomain() {
    if (this.state.current_user_domain >= this.getDomains().length) {
      return "";
    }

    if (this.state.current_user_domain != null) {
      return this.getDomains()[this.state.current_user_domain]['name'];
    } else {
      return "";
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
          You haven&#39;t visited any pages yet {this.range()}.
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
      <div className="user-domains">
        <div className="title-info-left">
          <div className="analytics-title">
            {this.sectionHeader()}
          </div>
          <div className="top-list">
            {this.firstfivelist(this.getDomains().slice(0, 5))}
            {this.secondfivelist(this.getDomains().slice(5, 10))}
          </div>
        </div>
        <div className="piechart-right">
          <div className="domain-pie-top">
            <ResponsiveContainer height="100%" width="100%">
              <PieChart onMouseEnter={this.onPieEnter.bind(this)}>
                <Pie
                  activeIndex={this.state.current_user_domain}
                  activeShape={this.renderActive}
                  data={this.getDomains()}
                  innerRadius={'60%'}
                  outerRadius={'85%'}
                  fill="#8884d8"
                  paddingAngle={1}
                >
                  {
                    this.getDomains().map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                  }
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="domain-pie-bottom">
            <span>
              {this.currentDomain()}
            </span>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserDomains);
