import * as types from '../constants/ActionTypes';

const tab = (state, action) => {
  switch (action.type) {
    default:
      return state
  }
}

function currentTabsReducer(state = [], action){
  switch(action.type){
    case types.RECEIVE_TABS:
      return action.tabs;
    default:
        return state;
  }
}

export default currentTabsReducer;
