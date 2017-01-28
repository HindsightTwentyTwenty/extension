import * as types from '../constants/ActionTypes';

function blacklistReducer(state = {urls: []}, action){
  switch(action.type){
    case types.RECEIVE_BLACKLIST:
      return { urls: action.blacklist };
    case types.REMOVE_FROM_BLACKLIST:
      var blacklist = [];
      var currentUrls = state.urls;
      for(var i = 0; i < currentUrls.length; i++) {
        if (currentUrls[i].pk !== action.pk) {
          blacklist.push(currentUrls[i]);
        }
      }
      return { urls: blacklist};
    case types.ADD_TO_BLACKLIST:
      return { urls: state.urls.concat(action.blacklistedSite)}
    default:
        return state;
  }
}

export default blacklistReducer;
