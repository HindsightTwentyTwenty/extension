import * as types from '../constants/ActionTypes';

//if no valid username:
function userReducer(state = {user_name:"", token:"", forgot:false, invalid_login:false}, action){

  switch(action.type){
    case types.RECEIVE_USER_TOKEN:
      chrome.storage.local.set({"hindsite-token": action.token});
      return Object.assign({}, {user_name:action.user_name, token:action.token, forgot: false, invalid_login:false});
    case types.USER_ERROR:
      console.log("user login error in reducer");
      return Object.assign({}, {user_name: state.user_name, token:state.token, forgot: state.forgot, invalid_login:true});
    case types.RECEIVE_USER_TOKEN_FROM_CHROME:
      if(action.token != null && action.token['hindsite-token'] != null){
        console.log("ITS NOT  NULL", action.token);
        return Object.assign({}, {user_name: state.user_name, token:action.token['hindsite-token'], forgot: false, invalid_login:false});
      } else {
        return state;
      }
    case types.FORGOT_MY_PASSWORD_PAGE:
      return Object.assign({}, {user_name: state.user_name, token:state.token, forgot: action.forgot, invalid_login:false});

      //return [...state, forgot=action.forgot];
    default:
        return state;
  }
}

export default userReducer;
