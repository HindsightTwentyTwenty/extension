import * as types from '../constants/ActionTypes';
import * as GlobalConstants from '../constants/GlobalConstants';
import * as PopupConstants from '../constants/PopupConstants';

function sessionsReducer(state = {ongoingSession: false,
  durationId: PopupConstants.DURATION_OPTIONS[3].id,
  currentSession:{ title: "", start: "", end: ""}}, action){
  switch(action.type){
    case types.SET_DURATION_ID:
      return {...state, durationId: action.durationId}
    default:
        return state;
  }
}

export default sessionsReducer;
