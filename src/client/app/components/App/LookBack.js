import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as TabActions from '../../actions/Tabs/TabActions.js';
import * as LookbackActions from '../../actions/App/LookbackActions.js';
import SelectedDomainBar from '../Bars/SelectedDomainBar.js';

import TabComponent from './TabComponent.js';

function getState() {
	return {
    start_date_formatted: "",
    end_date_formatted:"",
		first_time_break_formatted:"",
		second_time_break_formatted:"",
		tabs:""
	}
}

class LookBack extends Component {

  constructor(props) {
    super(props);
    this.state = getState();

  }

  componentWillReceiveProps(props) {
    this.getFormattedStartEnd(this.props.start_date, this.props.end_date);
		this.getFormattedTimeBreaks(this.props.start_date, this.props.end_date);
		var curr_tabs =  this.getTabs(props);
		this.setState({
			tabs: curr_tabs
		});

  }

  getTabComponent(index) {
    return <TabComponent key={index} curr_index={index}/>;
  }

	getPrevPage(){
		var new_start_hour = new Date(this.props.start_date).getHours() - 1;
		var new_start_date = new Date(this.props.start_date);
		new_start_date.setHours(new_start_hour);

		var new_end_hour = new Date(this.props.end_date).getHours() - 1;
		var new_end_date = new Date(this.props.end_date);
		new_end_date.setHours(new_end_hour);
		this.props.lookback_actions.changeTimeframe(new_start_date, new_end_date);

		this.props.tab_actions.getAllTabs(new_start_date.toJSON(), new_end_date.toJSON() , this.props.currentUser.token);

	}

	getNextPage(){
		var curr_Date = new Date();

		var new_start_hour = new Date(this.props.start_date).getHours() + 1;
		var new_start_date = new Date(this.props.start_date);
		new_start_date.setHours(new_start_hour);

		var new_end_hour = new Date(this.props.end_date).getHours() + 1;
		var new_end_date = new Date(this.props.end_date)
		new_end_date.setHours(new_end_hour);

		if(new_end_date > curr_Date){
			return;
		}

		this.props.lookback_actions.changeTimeframe(new_start_date, new_end_date);
		this.props.tab_actions.getAllTabs(new_start_date.toJSON(), new_end_date.toJSON(), this.props.currentUser.token);

	}


  getFormattedTime(date_string){
    if(date_string){
      var date = new Date(date_string);

      var hour = date.getHours() - (date.getHours() >= 13 ? 12 : 0);
			if(hour == 0){
				hour = 12;
			}
      var period = date.getHours() >= 12 ? 'PM' : 'AM';
      var minutes = ( date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

      var datetext = (hour +  ':' + minutes + ' ' +period);
      return datetext;
    }else{return "";}

  }

  getFormattedDate(date_string){
    if(date_string){
      var date = new Date(date_string);
      var monthes = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      var month = monthes[(date.getMonth() -1)];
      var datetext = (month + " " + date.getDate());

      return datetext;
    }else{return "";}

  }

  getFormattedStartEnd(s_date_string, e_date_string){
    var formatted_start = this.getFormattedDate(s_date_string) + " " + this.getFormattedTime(s_date_string);
    var formatted_end = this.getFormattedDate(e_date_string) + " " + this.getFormattedTime(e_date_string);
    this.setState({
        start_date_formatted: formatted_start,
        end_date_formatted: formatted_end
      });
  }


  getFormattedTimeBreaks(s_date_string, e_date_string){
		var second_break_minute = new Date(e_date_string).getMinutes() - 20;
		var first_break_minute = second_break_minute - 20;

		var first_break = new Date(e_date_string).setMinutes(first_break_minute);
		var second_break = new Date(e_date_string).setMinutes(second_break_minute);


    var formatted_first = this.getFormattedTime(first_break);
		var formatted_second = this.getFormattedTime(second_break);

    this.setState({
        first_time_break_formatted: formatted_first,
        second_time_break_formatted: formatted_second
      });
  }

  getTabs(currProps){

    if (Object.keys(currProps.tabs).length) {
      let results = []
      let curr_tabs = currProps.tabs;
      let numTabs = curr_tabs.length;

      for (let tIndex in curr_tabs) {
				// if(tIndex < 23){
					results.push(this.getTabComponent(tIndex))

				// }
      }
      return results;
    }
  }


  render() {
		if(this.props.currentDomainDisplayed.clicked){
			return(
				<div className="domainBar-zoom-container">
					<div className="row">
					<button className='close-detail-view-btn' onClick={() => {
						this.props.lookback_actions.toggleDomainClicked();
						this.props.lookback_actions.setCurrentPage({});
					}}>x</button>
					</div>
					<div className="row">
						<SelectedDomainBar domain={this.props.currentDomainDisplayed}/>
					</div>
				</div>
			)
		}
    return (
      <div className="lookback-graph-container">
        <div className="vertical-axis-label">Tabs</div>
	        <div className="time-labels">
	          <div className="start-time-label" onClick={this.getPrevPage.bind(this)}>
								<button id="back-button">
									back
								</button>
								{this.state.start_date_formatted}

						</div>
						<div id="time-break-line-label1">{this.state.first_time_break_formatted}</div>
						<div id="time-break-line-label2">{this.state.second_time_break_formatted}</div>
	          <div className="end-time-label">
								{this.state.end_date_formatted}
								<button id="back-button" onClick={this.getNextPage.bind(this)}>
									next
								</button>
						</div>
	        </div>
        <div className="lookback-container">
						<div className="time-break-line" id="first-time-break"></div>
						<div className="time-break-line" id="second-time-break"></div>

            {this.state.tabs}
        </div>

      </div>
    );
  }
}

let mapStateToProps = (state) => ({
    tabs : state.currentTabs,
    start_date: state.currentTime.start_date,
    end_date:state.currentTime.end_date,
		currentDomainDisplayed: state.currentDomainDisplayed,
		currentUser : state.currentUser

})

let mapDispatchToProps = (dispatch) => {
  return {
    tab_actions: bindActionCreators(TabActions, dispatch),
		lookback_actions: bindActionCreators(LookbackActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LookBack);
