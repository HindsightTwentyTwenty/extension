import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { ResponsiveContainer, PieChart, Legend, Pie, Sector, Cell } from 'recharts';
import * as UserActions from '../../actions/User/UserActions.js';
import * as AnalyticsActions from '../../actions/Analytics/AnalyticsActions.js';
import {COLORS} from '../../constants/AnalyticsConstants.js';
import ReactTooltip from 'react-tooltip';


function getState() {
  return {
    pie_page_index: null,
    pie_time_index: null,
    procr_site: "https://"
  }
}


class Productivity extends Component {

  constructor(props) {
    super(props);
    this.state = getState()
  }

  renderTimeActive(props) {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;

    return (
      <g>
        <text
          x={cx}
          y={cy}
          dy={8}
          textAnchor="middle"
          fill={'#55524D'}
          >
          <tspan x={cx} y={cy-10}>{payload.value}</tspan>
          <tspan x={cx} y={cy+10}>minutes</tspan>
        </text>
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

  renderPagesActive(props) {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;

    return (
      <g>
        <text
          x={cx}
          y={cy}
          dy={8}
          textAnchor="middle"
          fill={'#55524D'}
          >
          <tspan x={cx} y={cy-10}>{payload.value}</tspan>
          <tspan x={cx} y={cy+10}>pages</tspan>
        </text>
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
          <h4>Today&#39;s Productivity</h4>
        );
      case 'week':
        return (
          <h4>This Week&#39;s Productivity</h4>
        );
      case 'month':
        return (
          <h4>This Month&#39;s Productivity</h4>
        );
      default:
        return (
          <h4>This Week&#39;s Productivity</h4>
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

  onPagesEnter(data, index) {
    this.setState({pie_page_index: index})
  }

  onTimeEnter(data, index) {
    this.setState({pie_time_index: index})
  }

  getTimeSpent() {
    switch (this.props.analytics.range.length) {
      case 'day':
        return this.props.analytics.productivity.minutes.day;
      case 'week':
        return this.props.analytics.productivity.minutes.week;
      case 'month':
        return this.props.analytics.productivity.minutes.month;
      default:
        return this.props.analytics.productivity.minutes.week;
      }
  }

  getPagesVisited() {
    switch (this.props.analytics.range.length) {
      case 'day':
        return this.props.analytics.productivity.visits.day;
      case 'week':
        return this.props.analytics.productivity.visits.week;
      case 'month':
        return this.props.analytics.productivity.visits.month;
      default:
        return this.props.analytics.productivity.visits.week;
      }
  }

  keyPressed(event){
    var keycode = event.keyCode || event.which;
    if(keycode == '13') {
        this.sendProcrastination();
    }
  }

  sendProcrastination() {
    var input = this.input.value;
    if(input != ''){
      this.props.analytics_actions.addProcrastination(input, this.props.currentUser.token);
      this.setState({procr_site: "https://"});
      this.input.value = '';
    }
  }

  removeProcrastination(event) {
    this.props.analytics_actions.removeProcrastination(event.target.id, this.props.currentUser.token);
  }

  getButton() {
    var url_regex = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})$/;
    var patt = new RegExp(url_regex);

    if (this.state.procr_site == "https://") {
      return (
        <span>
          <ReactTooltip place="right" effect="solid" />
          <i className="fa fa-info-circle fa-info-modify"
             id="time_spent_explanation"
             data-tip="Enter a domain to add to your procrastination list" aria-hidden="true"></i>
        </span>
      );
    } else if (patt.test(this.state.procr_site)) {
      return (
        <span onClick={() => {this.sendProcrastination();}}>
          <i className="fa fa-plus fa-align-center fa-plus-modify" aria-hidden="true"></i>
        </span>
      );
    } else {
      return (
        <span>
          <ReactTooltip place="right" effect="solid" />
          <i className="fa fa-exclamation-triangle fa-caution-modify"
             id="time_spent_explanation"
             data-tip="Invalid Domain. Don't worry about the http:// or https://" aria-hidden="true"></i>
        </span>
      );
    }
  }

  updateField(event) {
    this.setState({procr_site: "https://" + event.target.value})
  }

  procrastinationSites() {
    var html = [];
    var p_sites = this.props.analytics.productivity.procrastination_sites;
    for (var i=0; i<p_sites.length; i++) {
      html.push(
        <span className="site">
          <div className="site-name">{p_sites[i]}</div>
          <span className="trash" onClick={this.removeProcrastination.bind(this)}>
            <i id={p_sites[i]} className="fa fa-trash"></i>
          </span>
        </span>
      );
    }

    return html;
  }

  prodRight() {
    var visits = 0;

    switch (this.props.analytics.range.length) {
      case 'day':
        visits = this.props.analytics.user_domains.day.length;
        break;
      case 'week':
         visits = this.props.analytics.user_domains.week.length;
         break;
      case 'month':
        visits = this.props.analytics.user_domains.month.length;
        break;
      default:
        visits = 0;
        break;
    }

    if (visits > 0) {
      return (
        <div className="prod-right">
          <div className="prod-inner-left">
            <div className="pie-title">
              <span>By Time Spent:&nbsp;</span>
              <ReactTooltip place="right" effect="solid" />
              <i className="fa fa-info-circle"
                 id="time_spent_explanation"
                 data-tip="Overlap between blacklisted sites and procrastination sites will skew this data." aria-hidden="true"></i>
            </div>
            <ResponsiveContainer height="89%" width="100%">
              <PieChart onMouseEnter={this.onTimeEnter.bind(this)}>
                <Pie
                  activeIndex={this.state.pie_time_index}
                  activeShape={this.renderTimeActive}
                  data={this.getTimeSpent()}
                  innerRadius={'55%'}
                  outerRadius={'80%'}
                  fill="#8884d8"
                  paddingAngle={1}
                >
                  {
                    this.getTimeSpent().map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                  }
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="prod-inner-right">
            <div className="pie-title">
              <span>By Pages Visited:</span>
            </div>
            <ResponsiveContainer height="89%" width="100%">
              <PieChart onMouseEnter={this.onPagesEnter.bind(this)}>
                <Pie
                  activeIndex={this.state.pie_page_index}
                  activeShape={this.renderPagesActive}
                  data={this.getPagesVisited()}
                  innerRadius={'55%'}
                  outerRadius={'80%'}
                  fill="#8884d8"
                  paddingAngle={1}
                >
                  {
                    this.getPagesVisited().map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                  }
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="prod-inner-bottom">
            <i className="fa fa-circle productivity-color" aria-hidden="true"></i>
            <span className="recharts-legend-item-text">&nbsp;productivity&nbsp;&nbsp;</span>
            <i className="fa fa-circle procrastination-color" aria-hidden="true"></i>
            <span>&nbsp;procrastination</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="prod-none-visited">
          You haven&#39;t visited any pages yet {this.range()}.
        </div>
      )
    }
  }


  render() {
    return (
      <div className="productivity">
        <div className="prod-left">
          <div className="analytics-title">
            {this.sectionHeader()}
          </div>
          <div className="procrastination-sites">
            <h5 className="sub-title">Procrasination Domains:</h5>
            <div className="add-procrastination">
              <div className="input-group input-margin">
                <span className="input-group-addon input-xs-http">https://</span>
                <input type="text" className="form-control input-xs" placeholder="facebook.com"
                    onKeyPress={this.keyPressed.bind(this)} ref={node => {this.input = node}}
                    onChange={this.updateField.bind(this)}/>
              </div>
              {this.getButton()}
            </div>
            <div className="sites">
              {this.procrastinationSites()}
            </div>
          </div>
        </div>
        {this.prodRight()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Productivity);
