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

  calculateDomainWidth(created, closed){
    var start_date = new Date(this.props.start_date);
    var end_date = new Date(this.props.end_date);

    var time_elapsed = end_date.getTime() - start_date.getTime();

    var d_created_date = new Date(created);
    var d_closed_date = new Date(closed);

    var domain_time_elapsed = d_closed_date.getTime() - d_created_date.getTime();



    console.log("time_elapsed: ", time_elapsed);
    console.log("domain_time_elapsed: ", domain_time_elapsed);
    if(domain_time_elapsed > time_elapsed){
      return 100;
    }else{
      return (domain_time_elapsed/time_elapsed)*100;
    }



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


        if (this.props.tabs[index]) {
            for (let dIndex in domains) {
              var created = domains[dIndex].created;
              var closed = domains[dIndex].closed;
              console.log("created: ", created);
              console.log("closed: ", closed);
              var width = this.calculateDomainWidth(created, closed);
              width += "%";

              console.log("width: ", width);
              results.push(this.getDomainBar(domains[dIndex].title, width))
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
