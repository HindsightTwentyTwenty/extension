import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {LineChart, Line, XAxis, YAxis, CartesianGrid,
        ResponsiveContainer, Tooltip, Legend} from 'recharts';
import * as UserActions from '../../actions/User/UserActions.js';

class PageVisits extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="page-visits">
        <h4>Current Week Page Visits</h4>
        <ResponsiveContainer width="100%" height="85%">
          <LineChart data={this.props.analytics.page_visits}
            margin={{top: 10, right: 50, left: 5, bottom: 5}}>
           <XAxis dataKey="day"/>
           <YAxis/>
           <Tooltip/>
           <Line type="monotone" dataKey="pagevisits" name="Pages Visited" stroke="#F8A055" activeDot={{r: 5}}/>
           <Line type="monotone" dataKey="pages" name="Unique Pages" stroke="#FA6E59" activeDot={{r: 5}}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
	currentUser : state.currentUser,
  analytics : state.analytics
})


let mapDispatchToProps = (dispatch) => ({
    user_actions: bindActionCreators(UserActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PageVisits);
