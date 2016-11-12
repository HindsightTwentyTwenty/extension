import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as TabActions from '../../actions/Tabs/TabActions.js';
import * as LookbackActions from '../../actions/App/LookbackActions.js';
import LookBackDetails from './LookBackDetails.js';


class AppBaseComponent extends Component {

  constructor(props) {
    super(props);
  }


  get_all_tabs(){
    var end_date = new Date();
    var start_date = new Date();
    var four_hours_ago = end_date.getHours() - 1;
    // start_date.setDate(end_date.getDate() - 1);
    start_date.setHours(four_hours_ago);

    console.log("TODAY ", end_date.toJSON());
    console.log("YESTERDAY ", start_date.toJSON());

    this.props.lookback_actions.changeTimeframe(start_date, end_date);
    this.props.tab_actions.getAllTabs(start_date.toJSON(), end_date.toJSON());
  }



  render() {
    var tabs = ""
    if (this.props.tabs) {
      tabs = this.props.tabs.map(function (tab){
          return (
            <div key={tab.created}>{tab.domains[0].base_url}</div>
          );
      });
    }

    return (
      <div>
        <p>These are your tabs:</p>
        <button onClick={this.get_all_tabs.bind(this)}>
          Get All Tabs</button>
        <LookBackDetails/>
      </div>

    );
  }

}

let mapStateToProps = (state) => ({
    tabs : state.currentTabs,
    start_date : state.start_date,
    end_date : state.end_date
})

let mapDispatchToProps = (dispatch) => {
  return {
    tab_actions: bindActionCreators(TabActions, dispatch),
    lookback_actions: bindActionCreators(LookbackActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBaseComponent);
