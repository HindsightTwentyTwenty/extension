import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as TabActions from '../../actions/Tabs/TabActions.js';
import * as LookbackActions from '../../actions/App/LookbackActions.js';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';
import SelectedDomainBar from '../Bars/SelectedDomainBar.js';
import Datetime from 'react-datetime';
import Star from '../Star/Star.js';
const Timestamp = require('react-timestamp');
import { Slider } from 'antd';


import TabComponent from '../Bars/TabComponent.js';

function getState() {
	return {
    start_date_formatted: "",
    end_date_formatted:"",
		first_time_break_formatted:"",
		second_time_break_formatted:"",
		tabs:"",
		timeframe:60
	}
}

function formatter(value) {
	var hours = Math.floor((value + 1 )/4);
	var minutes = (value + 1 - (hours*4)) * 15;
	if(minutes == 0){
		minutes = '00';
	}
	return `${hours}:${minutes}`;
}

const marks = {
  0: '15 min',
  3: '1 hr',
  7: '2 hr',
	11: '3 hr',
  15: '4 hr'
};



class LookBack extends Component {
  constructor(props) {
    super(props);
    this.state = getState();
  }

	componentWillMount(){
		var intervalId = setInterval(this.jumpToNow.bind(this), 60000);
	}

  componentWillReceiveProps(props) {
		var start_date = Datetime.moment(this.props.start_date);
		var end_date = Datetime.moment(this.props.end_date);
		var break_length = (this.state.timeframe / 3);
		var first_break = Datetime.moment(this.props.start_date).add(break_length, 'm');
		var second_break = Datetime.moment(this.props.start_date).add((break_length * 2), 'm');

		var curr_tabs =  this.getTabs(props);
		this.setState({
			tabs: curr_tabs,
			end_date_formatted: end_date.format("MMM D h:mm A"),
			first_time_break_formatted: first_break.format("h:mm A"),
			second_time_break_formatted: second_break.format("h:mm A")
		});

  }

  getTabComponent(index) {
		//pass it key so that there is no "unique key" error
		//also need to pass curr_index, for some reason cannot index off of the key
    return <TabComponent key={index} curr_index={index} timeframe={this.state.timeframe}/>;
  }

	getPrevPage(){
		var start_date = Datetime.moment(this.props.start_date).subtract(this.state.timeframe, 'm');
		this.changeStartTime(start_date);
	}

	getNextPage(){
		var start_date = Datetime.moment(this.props.start_date).add(this.state.timeframe, 'm');
		this.changeStartTime(start_date);
	}

	//Get the html tabs
  getTabs(currProps){
    if (Object.keys(currProps.tabs).length) {
      let results = []
      let curr_tabs = currProps.tabs;

      for (let tIndex in curr_tabs) {
					results.push(this.getTabComponent(tIndex))
      }
      return results;
    }
  }

	/* change the start time of the timeline, taking into consideration that its a valid start date
	it also changes the end time, updates the props, and gets tabs in new timeframe */
	changeStartTime(input){
		var today = Datetime.moment().subtract(1, 'm');
		if(Datetime.moment.isMoment(input) && input.isBefore( today )){
			var one_timeframe_ago = today.subtract((this.state.timeframe), 'm');

			if(input.isAfter(one_timeframe_ago)){
				today.add(this.state.timeframe, 'm');
				this.props.lookback_actions.changeTimeframe(input.toDate(), today.toDate());
				this.props.tab_actions.getAllTabs(input.toJSON(), today.toJSON(), this.props.currentUser.token);
			}else{
				var new_end_date = Datetime.moment(input);
				new_end_date.add(this.state.timeframe, 'm');
				this.props.lookback_actions.changeTimeframe(input.toDate(), new_end_date.toDate());
				this.props.tab_actions.getAllTabs(input.toJSON(), new_end_date.toJSON(), this.props.currentUser.token);
			}
		}
	}

	jumpToNow(){
		var now_end = Datetime.moment();
		var now_begin = Datetime.moment().subtract(this.state.timeframe, 'm');
		this.props.lookback_actions.changeTimeframe(now_begin.toDate(), now_end.toDate());
		this.props.tab_actions.getAllTabs(now_begin.toJSON(), now_end.toJSON(), this.props.currentUser.token);
	}

	clickOutside(input){
		if(!Datetime.moment.isMoment(input)){
			this.props.lookback_actions.changeTimeframe(this.props.start_date, this.props.end_date);
		}
	}

	checkValidDateChosen(currentDate, selectedDate){
		//check that the date is not before 2017
		var earliest_day = Datetime.moment("2017-01-01");
		if(currentDate.isBefore(earliest_day)){
			return false;
		}
		//check that the date is not after today
		var today = Datetime.moment();
    return currentDate.isBefore( today );
	}

	onAfterChange(value) {
		var new_timeframe = (value + 1)*15;
		this.setState({
			timeframe: new_timeframe
		})
		var start_date = Datetime.moment(this.props.end_date).subtract(new_timeframe, 'm');
		this.props.lookback_actions.changeTimeframe(start_date.toDate(), this.props.end_date);
		this.props.tab_actions.getAllTabs(start_date.toJSON(), this.props.end_date.toJSON(), this.props.currentUser.token);
	}

	getCategories() {
    if (this.props.displayPage.categories) {
      return this.props.displayPage.categories.map((category) => {
        return <div className={'url-bar-category bar-category'} key={category.title} style={{"backgroundColor" : category.color}}>
            <div className="hide-overflow"><p>{category.title}</p></div>
            <div className='url-bar-category-times' onClick={()=>{
                this.props.category_actions.toggleCategory(this.props.displayPage.url, category, false, this.props.currentUser.token);
              }}>
            <i className='fa fa-times'></i>
            </div>
          </div>;
      });
    }
  }

  render() {
		var date = this.props.start_date;
    var hider = (this.state.iframehider_show ) ? <div className="hider" onClick={this.closeIframe.bind(this)} id="iframe-hider"></div>: '';
		var pageDetails = (this.props.currentDomainDisplayed.clicked && this.props.displayPage.url != "") ? <div className="page-details">
				<div className="row flex-row">
				<a className="page-title" target="_blank" href={this.props.displayPage.url}><p>{this.props.displayPage.title}</p></a>
				<div className='url-buttons vertical-center'>
					<Star/>
					<button className="iframe-open-button">
						<i className="fa fa-eye" aria-hidden="true"></i>
					</button>
					</div>
				</div>
				<div className='url-categories vertical-center'>
					{this.getCategories()}
				</div>
				<p>visited: <Timestamp time={this.props.displayPage.visited} format="full"/></p>
			</div>
			: <h4>Hover for detailed page information</h4>;
		var modal = this.props.currentDomainDisplayed.clicked ?
				<div className="modal-base" id="domain-modal">
					<div className="domain-modal-header">
							<div className="close-detail-view-btn" onClick={() => {
							this.props.lookback_actions.toggleDomainClicked();
							this.props.lookback_actions.setCurrentPage({});}}>
								<i className="fa fa-times fa-lg" aria-hidden="true"></i>
							</div>
						</div>
						{pageDetails}
						<div>
							<SelectedDomainBar domain={this.props.currentDomainDisplayed}/>
						</div>
					</div> : '';

		var timeframeSlider = <div id="slider-wrapper">
														<Slider id="lookback-slider"
															tipFormatter={formatter}
															marks={marks}
															step={1}
															defaultValue={3}
															max={15}
															onAfterChange={this.onAfterChange.bind(this)}/>
													</div>;


    return (
			<div>
			{modal}
			<div id="graph-plus-buttons">

				<div className="time-change-button">
					<div id="time-change-btn-buffer-lft"></div>
					<div id="time-change-btn-wrapper">
						<i className="fa fa-angle-left fa-5x arrow-btn" aria-hidden="true" onClick={this.getPrevPage.bind(this)}></i>
					</div>
				</div>
	      <div className="lookback-graph-container">
		        <div className="time-labels">
							<div className="timeline-label-row" id="timeline-label-row-top">
								{timeframeSlider}
								<div className="jump-btn" onClick={this.jumpToNow.bind(this)}>Jump to now</div>
							</div>
							<div className="timeline-label-row" id="timeline-label-row-btm">
								<div className="date-picker" >
									<Datetime
										value={this.props.start_date}
										onChange={this.changeStartTime.bind(this)}
										isValidDate={this.checkValidDateChosen.bind(this)}
										viewMode='time'
										onBlur={this.clickOutside.bind(this)}
									/>
								</div>
								<div id="time-break-min-box-left"></div>
								<div id="time-break-line-label1">{this.state.first_time_break_formatted}</div>
								<div id="time-break-min-box-right"></div>
								<div id="time-break-line-label2">{this.state.second_time_break_formatted}</div>
								<div id="end-date-label">{this.state.end_date_formatted}</div>
						</div>
		        </div>
	        <div className="lookback-container">
							<div id="time-break-container">
								<div className="time-break-line" id="first-time-break"></div>
								<div className="time-break-line" id="second-time-break"></div>
							</div>
							<div id="tabs-container">
								{this.state.tabs}
							</div>
	        </div>
	      </div>
				<div className="time-change-button">
					<div id="time-change-btn-buffer-rt"></div>
					<div id="time-change-btn-wrapper">
						<i className="fa fa-angle-right fa-5x arrow-btn" aria-hidden="true" onClick={this.getNextPage.bind(this)}></i>
					</div>
				</div>
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
		currentUser : state.currentUser,
		displayPage: state.currentPage
})

let mapDispatchToProps = (dispatch) => {
  return {
    tab_actions: bindActionCreators(TabActions, dispatch),
		lookback_actions: bindActionCreators(LookbackActions, dispatch),
		category_actions: bindActionCreators(CategoryActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LookBack);
