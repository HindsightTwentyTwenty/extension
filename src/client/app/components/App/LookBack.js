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

  get_all_tabs(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    this.props.tab_actions.getAllTabs(mm, dd, yyyy);

  }


  getTabComponent(index) {
    return <TabComponent curr_index={index}/>;
  }

  getTabs(){
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

        <div className="lookback-container">
            {tabs}
        </div>
      </div>

    );
  }

}

let mapStateToProps = (state) => ({
    tabs : state.currentTabs
})

let mapDispatchToProps = (dispatch) => {
  return {
    tab_actions: bindActionCreators(TabActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LookBack);
