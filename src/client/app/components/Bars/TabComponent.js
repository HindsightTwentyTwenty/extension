import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as TabActions from '../../actions/Tabs/TabActions.js';
import DomainBar from '../Bars/DomainBar.js';
import Datetime from 'react-datetime';


class TabComponent extends Component {

  constructor(props) {
    super(props);
  }

  /*
    The value specific for this domainbar will be the "flex-grow" size not simply a percentage to take
    into consideration the items less than 24px size, which need to be 24px to account for favicon.
  */
  getDomainBar(domain, width, tab_id) {
    var width_style = Math.floor(width * 100);
    var active_times_style = this.getActiveTimesStyle(domain);
    var bar_style = {"flexGrow": width_style, "background" : active_times_style}
    /* give domains without a favicon a default favicon */
    var favicon;
    if(domain.favicon == ""){
      favicon = "../../assets/img/default-favicon.png"
    }else{
      favicon = domain.favicon;
    }
    return <DomainBar key={domain.pk} domain={domain} favicon={favicon} style={bar_style} tab_id={tab_id}/>;
  }

  /*
    get the width of the left buffer (represents time before the tab was opened in this
    timeframe), this is a width element on the div
  */
  getLeftBuffer(margin, domain) {
    margin += "%";
    var bar_style = {"width" : margin};
    return <div className="tab-lt-buffer" id="left_tab_buffer" style={bar_style}></div>
  }

  /*
    get the width of the right buffer (represents time after the tab was closed in this
    timeframe), this is a width element on the div
  */
  getRightBuffer(margin, domain){
    margin += "%";
    var bar_style = {"width" : margin};
    return <div className="tab-rt-buffer" id="rt_tab_buffer" style={bar_style}></div>
  }

  getActiveTimesStyle(domain){
    var active_color = "#194C76";
    var non_active_color = "#4897D8";
    var base = "linear-gradient(to right, " + non_active_color + " 0%";

    var time_opened = (new Date(domain.created)).getTime();
    if(domain.closed){
      var time_closed = (new Date(domain.closed)).getTime();
    } else {
      /* If domain is still open used tabs end date to get current time */
      var time_closed = (new Date(this.props.end_date)).getTime();
    }

    for(var i=0; i<domain.active_times.length; i++){
      var interval_start = (new Date(domain.active_times[i].start)).getTime();
      var interval_end = (new Date(domain.active_times[i].end)).getTime();

      /* Round to 2 decimal places and make percentage */
      var start_percent = Math.round(((interval_start - time_opened) / (time_closed - time_opened)) * 10000) / 100;
      var end_percent = Math.round(((interval_end - time_opened) / (time_closed - time_opened)) * 10000) / 100;

      base += ", " + non_active_color + " " + start_percent + "%, ";
      base += active_color + " " + start_percent + "%, " + active_color + " " + end_percent + "%"
      base += ", " + non_active_color + " " + end_percent + "%";
    }
    base += ", " + non_active_color + " 100%)";

    return base;
  }

  /*Returns the valid created date if an item was created before the time frame
    curr_created_date = what the created_date is on the domain item currently
    timeframe_start_date = the start date of the timeframe */
  getValidCreatedDate(curr_created_date, timeframe_start_date){
    var d_created_date;
    if(curr_created_date.isBefore(timeframe_start_date)){
      d_created_date = timeframe_start_date;
    }else{
      d_created_date = curr_created_date;
    }
    return d_created_date;
  }

  /*Returns the valid closed date if an item was closed after the time frame (or still open)
    curr_closed_date = what the closed_date is on the domain item currently
    timeframe_end_date = the end date of the timeframe */
  getValidClosedDate(curr_closed_date, timeframe_end_date){
    var d_closed_date;
    /* if the domain never closed, give it a closed date
      or if the domain closes after the timeframe ends*/
    if(!curr_closed_date.isValid() || curr_closed_date.isAfter(timeframe_end_date)){
      d_closed_date = timeframe_end_date;
    }else{
      d_closed_date = curr_closed_date;
    }
    return d_closed_date;
  }

  /*
    calculate the width of each domain- we are calculating the percentage of the total
    tab open time in the timeframe (not the timeframe)
    The value returned will be the "flex-grow" size not simply a percentage to take
    into consideration the items less than 24px size, which need to be 24px to account for favicon.
    parameters:
      tab_timeframe_opened = amount of time that the TAB is open in the timeframe
      created = when the domain was opened on this tab in the timeframe
      closed = when the domain was closed on this tab IN the timeframe
  */
  calculateDomainWidth(tab_timeframe_opened, created, closed){
    var start_date = Datetime.moment(this.props.start_date);
    var end_date = Datetime.moment(this.props.end_date);
    var d_created_date = created;
    var d_closed_date = closed;

    var domain_time_elapsed = d_closed_date.diff(d_created_date, "seconds");
    var timeframe_in_secs = this.props.timeframe * 60;

    if(domain_time_elapsed == timeframe_in_secs){
      return 100/24;
    }
    return((domain_time_elapsed/ tab_timeframe_opened)*110)/24;
  }

  /*calculate the buffer on the left side */
  calculateLeftMargin(created_date, start_date){
    if(created_date.isBefore(start_date)){
      return 0;
    }
    var time_between_left = created_date.diff(start_date, "seconds");
    var timeframe_in_secs = this.props.timeframe * 60;
    return Math.floor((time_between_left/timeframe_in_secs)*100);
  }

  /*
    closed = time the domain is closed
    end_date = the time that the timeframe ends
  */
  calculateRightMargin(closed, end_date){
    if(closed.isAfter(end_date) || closed.isSame(end_date)){
      return 0;
    }
    var time_between_right = end_date.diff(closed, "seconds");
    var timeframe_in_secs = this.props.timeframe * 60;
    return Math.floor((time_between_right/timeframe_in_secs)*100);
  }



  /* top level function to get the domains into the html */
  /* start_date is the time of the start of the timeline box (not the start time of the tab)
  end_date is the time of the end of the timeline box (not the end time of the tab) */
  getDomains() {
    var index = this.props.curr_index
    if(this.props.start_date && this.props.end_date && this.props.tabs[index]){
      if (Object.keys(this.props.tabs).length) {

        let results = []
        /* domains: the different domains hit on this tab */
        var domains = this.props.tabs[index].domains;
        var numDomains = domains.length;

        /* the start and end date of the timeframe */
        var start_date = Datetime.moment(this.props.start_date);
        var end_date = Datetime.moment(this.props.end_date);

        /* the open, closed, and duration, of the tab opened in the timeframe */
        var tab_opened_date = this.getValidCreatedDate(Datetime.moment(domains[0].created), start_date);
        var tab_closed_date = this.getValidClosedDate(Datetime.moment(domains[(domains.length -1)].closed), end_date);
        var tab_timeframe_opened = tab_closed_date.diff(tab_opened_date, "seconds");

        for (var dIndex in domains) {

          var created = this.getValidCreatedDate(Datetime.moment(domains[dIndex].created), start_date);
          var closed = this.getValidClosedDate(Datetime.moment(domains[dIndex].closed), end_date);
          var width = this.calculateDomainWidth(tab_timeframe_opened, created, closed);

          /* if this is the first domain on the tab, get the left buffer to account for time before
            the tab was opened in this timeframe */
          if(dIndex == 0){
            var margin = this.calculateLeftMargin(created, start_date);
            results.push(
                this.getLeftBuffer(margin, domains[dIndex]),
                this.getDomainBar(domains[dIndex], width, this.props.tabs[index].tab_id)
            );
          }else{
            results.push(this.getDomainBar(domains[dIndex], width, this.props.tabs[index].tab_id));
          }
          /* if this is the last domain on the tab, get the right buffer to account for the time after
            the tab was closed in this timeframe */
          if(dIndex == (numDomains -1)){
            var margin = this.calculateRightMargin(closed, end_date);
            results.push(
                this.getRightBuffer(margin, domains[dIndex])
            );
          }

        }
      return results;
      }
    }
  }

  render() {
    var domains = this.getDomains();
    return (
      <div>
        <div className="tab-component-wrapper">
          {domains}
          <div className="tab-rt-buffer" id="right_tab_buffer"></div>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    tabs : state.currentTabs,
    start_date: state.currentTime.start_date,
    end_date:state.currentTime.end_date
})

let mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabComponent);
