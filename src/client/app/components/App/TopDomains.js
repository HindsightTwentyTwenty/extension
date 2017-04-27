import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { ResponsiveContainer, PieChart, Pie, Sector, Cell } from 'recharts';
import * as UserActions from '../../actions/User/UserActions.js';
import * as AnalyticsActions from '../../actions/Analytics/AnalyticsActions.js';
import {COLORS} from '../../constants/AnalyticsConstants.js';

class TopDomains extends Component {

  constructor(props) {
    super(props);
  }

  renderActive(props) {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;

    if (payload.name.length < ((innerRadius*2-5)/6 - 2)) {
      return (
        <g>
          <text
            x={cx}
            y={cy}
            dy={8}
            textAnchor="middle"
            fill={'#55524D'}
            >
            {payload.name}
          </text>
          <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
          />
        </g>
      );
    } else {
      return (
        <g>
          <text
            x={cx}
            y={cy}
            dy={8}
            textLength={innerRadius*2-5}
            lengthAdjust="spacingAndGlyphs"
            textAnchor="middle"
            fill={'#55524D'}
            >
            {payload.name}
          </text>
          <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
          />
        </g>
      );
    }
};

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

  onPieEnter(data, index) {
    switch (this.props.analytics.range.length) {
      case 'day':
        this.props.analytics_actions.activeUserDomain(index)
        break;
      case 'week':
        this.props.analytics_actions.activeUserDomain(index)
        break;
      case 'month':
        this.props.analytics_actions.activeUserDomain(index)
        break;
      default:
        this.props.analytics_actions.activeUserDomain(this.props.analytics.user_domains.month[index].name)
        break;
    }
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

  firstfivelist(domains) {
    if (domains.length > 0) {
      return (
        <div className="five-list" style={{float: 'left'}}>
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
        <div className="five-list" style={{float: 'right'}}>
          {domains[0] ?
            <div className="list-element">{'6. ' + domains[0].name}</div> :
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
      <div className="top-domains">
        <div className="title-info-left">
          <div className="analytics-title">
            {this.sectionHeader()}
            <h4>&nbsp;Top Domains</h4>
          </div>
          <div className="top-list">
            {this.firstfivelist(this.getDomains().slice(0, 5))}
            {this.secondfivelist(this.getDomains().slice(5, 10))}
          </div>
        </div>
        <div className="piechart-right">
          <ResponsiveContainer height="100%" width="100%">
            <PieChart onMouseEnter={this.onPieEnter.bind(this)}>
              <Pie
                activeIndex={this.props.analytics.current_user_domain}
                activeShape={this.renderActive}
                data={this.getDomains()}
                innerRadius={'55%'}
                outerRadius={'80%'}
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

export default connect(mapStateToProps, mapDispatchToProps)(TopDomains);
