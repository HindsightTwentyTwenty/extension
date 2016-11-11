import * as types from '../constants/ActionTypes';

function lookBackReducer(state = 0, action){
  switch(action.type){
    case types.SWITCH_LOOKBACK_SELECTION:
      return action.lookBackSelection;
    default:
        return state;
  }
}

export default lookBackReducer;
