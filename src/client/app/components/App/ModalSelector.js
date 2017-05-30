import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as NavActions from '../../actions/App/NavActions.js';


class RangeSelector extends Component {

  constructor(props) {
    super(props);
  }

  getClassName(view) {
    if (this.props.appNav.modalView.length == view) {
      return "active";
    }
  }

  render() {
    return (
        <ul className="nav nav-pills modal-selector">
          <li role="presentation" className={this.getClassName('info')}><a onClick={() => {
            this.props.nav_actions.changeModalView('info');
          }}>Info</a></li>
          <li role="presentation" className={this.getClassName('preview')}><a onClick={() => {
            this.props.nav_actions.changeModalView('preview');
          }}>Preview</a></li>
        </ul>
    )
  }

}

let mapStateToProps = (state) => ({
  appNav : state.appNav
})

let mapDispatchToProps = (dispatch) => ({
    nav_actions: bindActionCreators(NavActions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(RangeSelector);
