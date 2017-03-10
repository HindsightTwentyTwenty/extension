import * as types from '../constants/ActionTypes';

function currentTabsReducer(state = [], action){
  switch(action.type){
    case types.RECEIVE_TABS:
      return action.tabs.tabs;
    default:
        return state;
  }
}

export default currentTabsReducer;
