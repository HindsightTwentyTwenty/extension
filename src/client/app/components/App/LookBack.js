import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as TabActions from '../../actions/Tabs/TabActions.js';
import DomainBar from '../Bars/DomainBar.js';

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


  getDomainBar(title, width) {
    return <DomainBar title={title} width={width}/>;
  }

  getDomains(index) {
    if (Object.keys(this.props.tabs).length) {
      let results = []
      let domains = this.props.tabs[index].fields.domains;
      var numDomains = Object.keys(domains).length;
      console.log("numDomains: ", numDomains);
      var width = (1/numDomains) * 100;
      width += "%";

      if (this.props.tabs[index]) {
          for (let dIndex in domains) {
            results.push(this.getDomainBar(domains[dIndex].fields.title, width))
          }
        return results;
      }
    }
  }


  render() {
    var domains = this.getDomains(0);
    return (
      <div className="lookback-container">
          {domains}
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
