import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as TabActions from '../../actions/Tabs/TabActions.js';
import DomainBar from '../Bars/DomainBar.js';

class TabComponent extends Component {

  constructor(props) {
    super(props);
  }

  getDomainBar(domain, width, favicon_url, tab_id) {
    var width_style = width;
    var active_times_style = this.getActiveTimesStyle(domain);
    var bar_style = {"width" : width_style, "background" : active_times_style}
    return <DomainBar domain={domain} style={bar_style} favicon_url={favicon_url} tab_id={tab_id}/>;
  }
  getFirstDomainBar(domain, width, margin, favicon_url, tab_id) {
    var width_style = width;
    var active_times_style = this.getActiveTimesStyle(domain);
    var bar_style = {"width" : width_style, "marginLeft": margin, "background" : active_times_style}
    return <DomainBar domain={domain} style={bar_style} favicon_url={favicon_url} tab_id={tab_id}/>;
  }

  getActiveTimesStyle(domain){
    var active_color = "#2b616d";
    var non_active_color = "#b2dbd5";
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

  calculateDomainWidth(time_elapsed, created, closed){

    var d_created_date = new Date(created);
    var d_closed_date = new Date(closed);

    if(d_created_date < this.props.start_date){
      d_created_date = this.props.start_date;
    }
    if(d_closed_date > this.props.end_date){
      d_closed_date = this.props.end_date;
    }


    var domain_time_elapsed = d_closed_date.getTime() - d_created_date.getTime();

    if((domain_time_elapsed/time_elapsed)*100 > 2){
      return (domain_time_elapsed/time_elapsed)*100 -2;
    }
    return (domain_time_elapsed/time_elapsed)*100;

  }

  calculateLeftMargin(time_elapsed, created, start_date){
    var start_date = new Date(start_date);
    var created_date = new Date(created);
    var time_between = created_date.getTime() - start_date.getTime();

    if(((time_between/time_elapsed)*100) > 5){
      return Math.floor((time_between/time_elapsed)*100)-5;
    }
    return Math.floor((time_between/time_elapsed)*100);

  }

  getDomains() {
    if(this.props){
      var index = this.props.curr_index
      if (Object.keys(this.props.tabs).length) {
        let results = []
        let domains = this.props.tabs[index].domains;
        var numDomains = Object.keys(domains).length;

        var start_date = new Date(this.props.start_date);
        var end_date = new Date(this.props.end_date);
        var time_elapsed = end_date.getTime() - start_date.getTime();

        if (this.props.tabs[index]) {
            for (let dIndex in domains) {

              var created = domains[dIndex].created;
              var closed = domains[dIndex].closed;
              var favicon_url = domains[dIndex].favicon;
              if (closed == null){
                closed = end_date;
              }
              // console.log("created: ", created);
              // console.log("closed: ", closed);
              var width = this.calculateDomainWidth(time_elapsed, created, closed);
              width += "%";
              // console.log("width: ", width);

              if(dIndex == 0){
                var margin = this.calculateLeftMargin(time_elapsed, created, start_date);
                margin += "%";
                // console.log("margin: ", margin);

                results.push(this.getFirstDomainBar(domains[dIndex], width, margin, favicon_url, this.props.tabs[index].tab_id))
              }
              else{
                results.push(this.getDomainBar(domains[dIndex], width, favicon_url, this.props.tabs[index].tab_id))
              }
            }
          return results;
        }
      }
    }
  }

  render() {
    var domains = this.getDomains();
    return (
      <div>
        {domains}
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
    tab_actions: bindActionCreators(TabActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabComponent);
