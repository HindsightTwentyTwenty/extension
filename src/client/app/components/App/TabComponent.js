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

    var domain_time_elapsed = d_closed_date.getTime() - d_created_date.getTime();



    // console.log("time_elapsed: ", time_elapsed);
    // console.log("domain_time_elapsed: ", domain_time_elapsed);
    if(domain_time_elapsed > time_elapsed){
      return 100;
    }else{
      return (domain_time_elapsed/time_elapsed)*100;
    }



  }

  calculateLeftMargin(time_elapsed, created, start_date){
    var start_date = new Date(start_date);
    var created_date = new Date(created);
    console.log("created_date: ", created_date);
    console.log("start_date: ", start_date);
    var time_between = created_date.getTime() - start_date.getTime();
    console.log(time_between);
    console.log(time_elapsed);

    return Math.floor((time_between/time_elapsed)*100)-5;

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


        if (this.props.tabs[index]) {
          // var prev_closed = this.props.start_date;
            for (let dIndex in domains) {
              var created = domains[dIndex].created;
              var closed = domains[dIndex].closed;
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

              // var margin = this.calculateLeftMargin(time_elapsed, prev_closed, created);
              // margin += "%";
              // console.log("margin: ", margin);
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
