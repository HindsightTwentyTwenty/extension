import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as PopupActions from '../../actions/Popup/PopupActions.js';
import * as PopupConstants from '../../constants/PopupConstants.js';

class EmphasizeSessions extends Component {
  constructor(props) {
    super(props);
  }

  changeDuration(id) {
    this.props.popup_actions.setDuration(id);
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
        <button className="btn session-btn" type="button" onClick={() => {
        }}>End Session</button>
      </div>
    )
  }

  getDurationOptions(){
    return PopupConstants.DURATION_OPTIONS.map( function(option) {
      if(option.id == this.props.sessions.durationId) {
        return <button className="btn duration-btn active" type="button" key={option.duration} onClick={() => {
          this.changeDuration(option.id)
        }}>{option.duration}</button>
      } else {
        return <button className="btn duration-btn" type="button" key={option.duration} onClick={() => {
          this.changeDuration(option.id)
        }}>{option.duration}</button>
      }
    }, this);
  }

	startSession() {
		var sessionTitle = this.input.value.trim();
		if (sessionTitle == "") {
			//WC TODO: Error handling for user.
			return;
		}
		var durationId = this.props.sessions.durationId;
		var startTime = new Date();
		if (durationId != PopupConstants.DURATION_OPTIONS[3].id) {
			var endTime = new Date();
			var duration;
			if (durationId == 0) {
				duration = 1;
			} else if (durationId == 1) {
				duration = 2;
			} else {
				duration = 4;
			}
	    endTime.setHours(startTime.getHours() + duration);
			this.props.popup_actions.addSession(this.props.currentUser.token, sessionTitle, startTime, endTime);
		} else {
			this.props.popup_actions.addSession(this.props.currentUser.token, sessionTitle, startTime);
		}
	}

  getNewSession(){
    return(
      <div className="new-session">
        <div className="new-session-info">
					<input type="text" className="popup-form form-control" placeholder="New Session..."
					 ref={node => {
						this.input = node;
					}} />
          duration: {this.getDurationOptions()}
        </div>
        <button className="btn session-btn" type="button" onClick={()=> this.startSession()}>
					Start Session
				</button>
      </div>
    )
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
