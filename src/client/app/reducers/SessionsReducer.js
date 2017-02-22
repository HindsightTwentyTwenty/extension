import * as types from '../constants/ActionTypes';
import * as GlobalConstants from '../constants/GlobalConstants';

function sessionsReducer(state = {ongoingSession: false, currentSession:{ title: "", start: "", end: ""}}, action){
  switch(action.type){
    default:
        return state;
  }
}

export default sessionsReducer;
