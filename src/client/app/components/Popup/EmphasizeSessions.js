import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';
import * as PopupActions from '../../actions/Popup/PopupActions.js';
import CategoryEntry from './CategoryEntry.js';
import Star from '../Star/Star.js';
import CategoriesContainer from './CategoriesContainer';
import PopupHeader from './PopupHeader.js';
import ColorPicker from './ColorPicker.js';
import * as PopupConstants from '../../constants/PopupConstants.js';

class EmphasizeSessions extends Component {
  constructor(props) {
    super(props);
  }

  getCurrentSession() {
    var currentSession = this.props.sessions.currentSession;
    return(
      <div className="current-session">
        <div className="current-session-info">
          <h4>
            current session: {currentSession.title}
          </h4>
          <p> duration: {currentSession.start} - {currentSession.end} </p>
          <p> sites visited: </p>
        </div>
        <button className="btn end-session-btn" type="button" onClick={() => {
        }}>End Session</button>
      </div>
    )
  }

  getNewSession(){

  }

  render () {
      return (
        <div className="container popup-body electric-blue">
          <div className="popup-main-form">
            {this.props.sessions.ongoingSession ? this.getCurrentSession() : this.getNewSession()}
          </div>
        </div>
      )
    }
  }

let mapStateToProps = (state) => ({
    sessions : state.sessions,
    currentUser : state.currentUser,
})

let mapDispatchToProps = (dispatch) => {
  return {
    popup_actions : bindActionCreators(PopupActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmphasizeSessions);
