import * as types from '../constants/ActionTypes';


//WC TODO: SEEMS LIKE CAN DELETE THIS TAB THING?
const tab = (state, action) => {
  switch (action.type) {
    default:
      return state
  }
}

function currentTabsReducer(state = [], action){
  switch(action.type){
    case types.RECEIVE_TABS:
      return action.tabs.tabs;
    default:
        return state;
  }
}

export default currentTabsReducer;
