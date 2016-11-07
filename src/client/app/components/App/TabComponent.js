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
    return <DomainBar title={title} width={width} style={bar_style}/>;
  }

  calculateDomainWidth(){
    var start_date = new Date(this.props.start_date);
    var end_date = new Date(this.props.end_date);

    var time_elapsed = end_date - start_date;
    console.log("time_elapsed: ", time_elapsed);


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

        var width = Math.floor((1/numDomains) * 100) -3;
        console.log("width: ", width);
        width += "%";

        if (this.props.tabs[index]) {
            for (let dIndex in domains) {
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
