import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { PieChart, Pie, Sector, Cell } from 'recharts';
import * as UserActions from '../../actions/User/UserActions.js';
import {COLORS} from '../../constants/AnalyticsConstants.js';

class TopDomains extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="word-cloud">
        <PieChart width={400} height={400} onMouseEnter={this.onPieEnter}>
          <Pie
            data={[{name: 'www.facebook.com', value: 450}, {name: 'www.google.com', value: 390},
                  {name: 'github.com', value: 350}, {name: 'marvelapp.com', value: 325},
                  {name: 'paletton.com', value: 250}]}
            cx={120}
            cy={200}
            innerRadius={50}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={2}
          >
            {
              [{name: 'www.facebook.com', value: 450}, {name: 'www.google.com', value: 390},
                    {name: 'github.com', value: 350}, {name: 'marvelapp.com', value: 325},
                    {name: 'paletton.com', value: 250}].map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
            }
          </Pie>
        </PieChart>
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

export default connect(mapStateToProps, mapDispatchToProps)(TopDomains);
