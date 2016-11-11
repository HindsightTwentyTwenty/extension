import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as TabActions from '../../actions/Tabs/TabActions.js';
import TabComponent from './TabComponent.js';

function getState() {
	return {
    start_date_formatted: "",
    end_date_formatted:""
	}
}

class LookBack extends Component {

  constructor(props) {
    super(props);
    this.state = getState();
  }
  componentWillReceiveProps(props) {
    this.getFormattedStartEnd(this.props.start_date, this.props.end_date);
  }

  getTabComponent(index) {
    return <TabComponent curr_index={index}/>;
  }

  getFormattedTime(date_string){
    if(date_string){
      var date = new Date(date_string);

      var hour = date.getHours() - (date.getHours() >= 12 ? 12 : 0);
      var period = date.getHours() >= 12 ? 'PM' : 'AM';
      var minutes = ( date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

      var datetext = (hour + 2 + ':' + minutes + ' ' +period);

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

  getTabs(){
    console.log("this.props: ", this.props);
    console.log("start date: ", this.props.start_date);
    console.log("end date: ",this.props.end_date);
    console.log("difference: ", (this.props.end_date - this.props.start_date));


    if (Object.keys(this.props.tabs).length) {
      let results = []
      let curr_tabs = this.props.tabs;
      let numTabs = curr_tabs.length;
      console.log("number of tabs: ", numTabs);

      for (let tIndex in curr_tabs) {
        results.push(this.getTabComponent(tIndex))
      }
      return results;
    }
  }


  render() {
    var tabs = this.getTabs();

    return (
	      <div className="lookback-graph-container">
	        <div className="horizontal-axis-label">Times</div>
	        <div className="vertical-axis-label">Tabs</div>

	        <div className="time-labels">
	          <div className="start-time-label">{this.state.start_date_formatted}</div>
	          <div className="end-time-label">{this.state.end_date_formatted}</div>
	        </div>
	        <div className="lookback-container">
	            {tabs}
	        </div>
	      </div>
    );
  }
}

let mapStateToProps = (state) => ({
    tabs : state.currentTabs,
    start_date: state.currentTime.start_date,
    end_date:state.currentTime.end_date
})

let mapDispatchToProps = (dispatch) => {
  return {
    tab_actions: bindActionCreators(TabActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LookBack);
