import * as types from '../constants/ActionTypes';


function timeReducer(state = {start_date:"", end_date:""}, action){
  switch(action.type){
    case types.UPDATE_START_DATE:
      return Object.assign({}, {start_date:action.start_date, end_date:state.end_date});
    case types.UPDATE_END_DATE:
    //TODO: Remove empty object source??
      return Object.assign({}, {start_date:state.start_date, end_date:action.end_date});
    case types.UPDATE_TIMEFRAME:
      //TODO: Remove empty object source??
      console.log("update time frame");
      console.log("start update time: ", action.start_date);
      return Object.assign({}, {start_date:action.start_date, end_date:action.end_date});
    default:
        return state;
  }
}

export default timeReducer;
