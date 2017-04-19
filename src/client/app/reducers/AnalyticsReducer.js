import * as types from '../constants/ActionTypes';

function analyticsReducer(state = {page_visits: [], tag_cloud: [], range: 'week'}, action){
  switch(action.type){
    case types.RECEIVE_ANALYTICS:
      return {...state, page_visits: action.page_visits, tag_cloud: action.tag_cloud };
    case types.CHANGE_RANGE:
      return {...state, range: action.range };
    default:
        return state;
  }
}

export default analyticsReducer;
