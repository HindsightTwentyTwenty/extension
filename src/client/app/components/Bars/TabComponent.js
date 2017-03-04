import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as TabActions from '../../actions/Tabs/TabActions.js';
import DomainBar from '../Bars/DomainBar.js';
import Datetime from 'react-datetime';


function getState(){
  return{
    lft_buffer_id:"",
    rt_buffer_id:""
  }
}

class TabComponent extends Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(){
    var left_buff = "left_buffer_" + this.props.curr_id;
    var right_buff = "right_buffer_" + this.props.curr_id;
    this.setState({
      lft_buffer_id: left_buff,
      rt_buffer_id: right_buff
    })
  }

  getDomainBar(domain, width, tab_id) {
    var width_style = width;
    console.log("flexgrow size:", width);
    var active_times_style = this.getActiveTimesStyle(domain);
    var bar_style = {"flex-grow": width_style, "background" : active_times_style}
    return <DomainBar key={domain.pk} domain={domain} style={bar_style} tab_id={tab_id}/>;
  }



  getLeftBuffer(margin) {
    margin += "%";
    var bar_style = {"width" : margin};
    return <div className="tab-lt-buffer" id="left_tab_buffer" style={bar_style}></div>
  }

  getRightBuffer(margin){
    margin += "%";
    var bar_style = {"width" : margin};
    return <div className="tab-rt-buffer" id="rt_tab_buffer" style={bar_style}></div>
  }

  getActiveTimesStyle(domain){
    var active_color = "#4897D8";
    var non_active_color = "#dbedfc";
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
    var start_date = Datetime.moment(this.props.start_date);
    var end_date = Datetime.moment(this.props.end_date);
    var d_created_date = Datetime.moment(created);
    var d_closed_date;

    /* if the domain never closed, give it a closed date */
    if(!closed.isValid() ){
      d_closed_date = end_date;
    }else{
      d_closed_date = Datetime.moment(closed);
    }

    if(d_created_date.isBefore(start_date)){
      d_created_date = start_date;
    }
    /* if the domain closes after the timeframe ends */
    if(d_closed_date.isAfter(end_date)){
      d_closed_date = end_date;
    }


    var domain_time_elapsed = d_closed_date.diff(d_created_date, "seconds");
    var timeframe_in_secs = this.props.timeframe * 60;
    // console.log("NEW DOMAIN BAR");
    // console.log("created date", d_created_date.format("MMM D h:mm A"));
    // console.log("closed date", d_closed_date.format("MMM D h:mm A"));
    // console.log("domain time elapsed", domain_time_elapsed);
    // console.log("time_elapsed", time_elapsed);
    if(domain_time_elapsed == timeframe_in_secs){
      return 100;
    }
    // }else if((domain_time_elapsed/timeframe_in_secs)*100 > 2){
    //   return (domain_time_elapsed/timeframe_in_secs)*100 -2;
    // }
    return (domain_time_elapsed/timeframe_in_secs)*100;

  }

  //calculate the buffer on the left side
  calculateLeftMargin(time_elapsed, created, start_date){
    var start_date = Datetime.moment(start_date);
    var created_date = Datetime.moment(created);

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
  calculateRightMargin(time_elapsed, closed, end_date){
    var end_date = Datetime.moment(end_date);
    var closed_date = Datetime.moment(closed);

    if(closed_date.isAfter(end_date)){
      return 0;
    }
    var time_between_right = end_date.diff(closed_date, "seconds");
    var timeframe_in_secs = this.props.timeframe * 60;
    console.log("TIME BETWEEN RIGHT", time_between_right);
    return Math.floor((time_between_right/timeframe_in_secs)*100);
  }

  /* top level function to get the domains into the html */
  getDomains() {
    var index = this.props.curr_index
    if(this.props.start_date && this.props.end_date && this.props.tabs[index]){
      if (Object.keys(this.props.tabs).length) {
        if(index == 0 || index == 1){
          console.log("this.props", this.props);
          console.log("index of tab component", index);
          console.log("tabs on component", this.props.tabs[index]);
        }

        let results = []
        /* domains: the different domains hit on this tab */
        let domains = this.props.tabs[index].domains;
        var numDomains = Object.keys(domains).length;

        var start_date = Datetime.moment(this.props.start_date);

        //if(this.props.end_date != null){
        var end_date = Datetime.moment(this.props.end_date);
        var time_elapsed = start_date.diff(end_date);

        // }else{
        //   end_date == null;
        //   var time_elapsed = end_date.getTime() - start_date.getTime();
        //   console.log("NULL time elapsed:", time_elapsed);
        //   //time_elapsed
        // }

        console.log("# domains:", domains.length);
        for (let dIndex in domains) {

          var created = Datetime.moment(domains[dIndex].created);
          var closed = Datetime.moment(domains[dIndex].closed);
          if (closed == null){
            closed = end_date;
          }

          var width = this.calculateDomainWidth(time_elapsed, created, closed);
          //width += "%";

          if(dIndex == 0){
            var margin = this.calculateLeftMargin(time_elapsed, created, start_date);


            results.push(
                this.getLeftBuffer(margin),
                this.getDomainBar(domains[dIndex], width, this.props.tabs[index].tab_id)
            );
          }else if(dIndex = (domains.length -1)){
            var margin = this.calculateRightMargin(time_elapsed, closed, end_date);
            //margin += "%";

            results.push(
              this.getDomainBar(domains[dIndex], width, this.props.tabs[index].tab_id),
                this.getRightBuffer(margin)
            );
          }
          else{
            results.push(this.getDomainBar(domains[dIndex], width, this.props.tabs[index].tab_id));
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
