import * as types from '../constants/ActionTypes';

//if no valid username:
function userReducer(state = {user_name:"", token:""}, action){
  switch(action.type){
    case types.RECEIVE_USER_TOKEN:
      chrome.storage.local.set({"hindsite-token": action.token});
      return Object.assign({}, {user_name:action.user_name, token:action.token});
    case types.USER_ERROR:
      console.log("ERROR ERROR");
      return state;
      // return Object.assign({}, {user_name:action.user_name, token:action.token});
    case types.RECEIVE_USER_TOKEN_FROM_CHROME:
      console.log("token from chrome IN REDUCER");
      return Object.assign({}, {user_name: state.user_name, token:action.token});
    default:
        return state;
  }
}

export default userReducer;
