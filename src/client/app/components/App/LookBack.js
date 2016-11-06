import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as TabActions from '../../actions/Tabs/TabActions.js';
import TabComponent from './TabComponent.js';

class LookBack extends Component {

  constructor(props) {
    super(props);
  }




  getTabComponent(index) {
    return <TabComponent curr_index={index}/>;
  }

  getTabs(){
    console.log("start date: ", this.props.start_date);
    console.log("end date: ",this.props.end_date);

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
        <div className="start-time-label">{this.props.start_date}</div>
        <div className="end-time-label">{this.props.end_date}</div>


        <div className="lookback-container">
            {tabs}
        </div>
      </div>

    );
  }

}

let mapStateToProps = (state) => ({
    tabs : state.currentTabs,
    start_date: state.start_date,
    end_date:state.end_date
})

let mapDispatchToProps = (dispatch) => {
  return {
    tab_actions: bindActionCreators(TabActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LookBack);
