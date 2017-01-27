import * as types from '../constants/ActionTypes';


function timeReducer(state = {start_date:"", end_date:""}, action){
  switch(action.type){
    case types.UPDATE_START_DATE:
      return {...state, start_date: action.start_date}
    case types.UPDATE_END_DATE:
      return {...state, end_date: action.end_date}
    case types.UPDATE_TIMEFRAME:
      return Object.assign({}, {start_date:action.start_date, end_date:action.end_date});
    default:
        return state;
  }
}

export default timeReducer;
