import * as types from '../constants/ActionTypes';

function blacklistReducer(state = { urls: [], blacklistTextEntry: ""}, action){
  switch(action.type){
    case types.REMOVE_FROM_BLACKLIST:
      var blacklist = [];
      var currentUrls = state.urls;
      for(var i = 0; i < currentUrls.length; i++) {
        if (currentUrls[i].title !== action.url) {
          blacklist.push(currentUrls[i]);
        }
      }
      return { urls: blacklist, blacklistTextEntry: state.blacklistTextEntry};
    case types.ADD_TO_BLACKLIST:
      return { urls: state.urls.concat([action.url]), blacklistTextEntry: state.blacklistTextEntry }
    default:
        return state;
  }
}

export default blacklistReducer;
