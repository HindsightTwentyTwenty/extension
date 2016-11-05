import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as TabActions from '../../actions/Tabs/TabActions.js';

class AppBaseComponent extends Component {

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

  render() {
    var tabs = ""
    if (this.props.tabs) {
      tabs = this.props.tabs.map(function (tab){
          return (
            <div key={tab.fields.created} >{tab.fields.domains[0].fields.base_url}</div>
          );
      });
    }

    return (
      <div>
        <p>These are your tabs:</p>
        <button onClick={this.get_all_tabs.bind(this)}>
          Get All Tabs</button>
        <div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AppBaseComponent);
