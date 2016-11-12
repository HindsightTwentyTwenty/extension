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

  getDomainBar(title, width) {
    var bar_style = {"width" : width}
    return <DomainBar title={title} style={bar_style}/>;
  }
  getFirstDomainBar(title, width, margin) {
    var bar_style = {"width" : width, "margin-left": margin}
    return <DomainBar title={title} style={bar_style}/>;
  }

  calculateDomainWidth(time_elapsed, created, closed){

    var d_created_date = new Date(created);
    var d_closed_date = new Date(closed);
    console.log("created date tab: ", d_created_date);
    console.log("started section: ", this.props.start_date);

    console.log("closed date tab: ", d_closed_date);
    console.log("ended section: ", this.props.end_date);
    if(d_created_date < this.props.start_date){
      d_created_date = this.props.start_date;
    }
    if(d_closed_date > this.props.end_date){
      d_closed_date = this.props.end_date;
    }


    var domain_time_elapsed = d_closed_date.getTime() - d_created_date.getTime();



    // console.log("time_elapsed: ", time_elapsed);
    // console.log("domain_time_elapsed: ", domain_time_elapsed);
    // if(d_created_date < this.props.start_date && d_){
    //   return 98;
    // }else{
    if((domain_time_elapsed/time_elapsed)*100 > 2){
      return (domain_time_elapsed/time_elapsed)*100 -2;
    }
    return (domain_time_elapsed/time_elapsed)*100;
    // }



  }

  calculateLeftMargin(time_elapsed, created, start_date){
    var start_date = new Date(start_date);
    var created_date = new Date(created);
    console.log("created_date: ", created_date);
    console.log("start_date eh: ", start_date);
    var time_between = created_date.getTime() - start_date.getTime();
    console.log("time between not in if:" , time_between );

    if(time_between < 0){
      console.log("time between!:" , time_between );

      return 0;
    }
    console.log(time_between);
    console.log(time_elapsed);
    if(((time_between/time_elapsed)*100) > 5){
      return Math.floor((time_between/time_elapsed)*100)-5;
    }
    return Math.floor((time_between/time_elapsed)*100);

  }

  // calculateBasicWith(){
  //   var width = Math.floor((1/numDomains) * 100) -3;
  //
  // }

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
        console.log("time elapsed: ", time_elapsed);


        if (this.props.tabs[index]) {
            for (let dIndex in domains) {
              console.log("TITLE OF DOMAIN: ", domains[dIndex].title);

              var created = domains[dIndex].created;
              var closed = domains[dIndex].closed;
              if (closed == null){
                closed = end_date;
              }
              console.log("created: ", created);
              console.log("closed: ", closed);
              var width = this.calculateDomainWidth(time_elapsed, created, closed);
              width += "%";
              console.log("width: ", width);

              if(dIndex == 0){
                var margin = this.calculateLeftMargin(time_elapsed, created, start_date);
                margin += "%";
                console.log("margin: ", margin);
                results.push(this.getFirstDomainBar(domains[dIndex].title, width, margin))
              }
              else{
                results.push(this.getDomainBar(domains[dIndex].title, width))
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
