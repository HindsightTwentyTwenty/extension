import * as types from '../constants/ActionTypes';

//if no valid username:
function userReducer(state = {user_name:"", token:"", forgot:false}, action){

  switch(action.type){
    case types.RECEIVE_USER_TOKEN:
      chrome.storage.local.set({"hindsite-token": action.token});
      return Object.assign({}, {user_name:action.user_name, token:action.token, forgot: false});
    case types.USER_ERROR:
      console.log("ERROR ERROR");
      return state;
    case types.RECEIVE_USER_TOKEN_FROM_CHROME:
      console.log("got token!", action.token);
      if(action.token != null && action.token['hindsite-token'] != null){
        console.log("ITS NOT  NULL");
        return Object.assign({}, {user_name: state.user_name, token:action.token['hindsite-token'], forgot: false});
      } else {
        console.log("ITS  NULL");

        return state;
      }
    case types.FORGOT_MY_PASSWORD_PAGE:
      console.log("forgot my password in user reducer");
      return Object.assign({}, {user_name: state.user_name, token:state.token, forgot: action.forgot});

      //return [...state, forgot=action.forgot];
    default:
        return state;
  }
}

export default userReducer;
