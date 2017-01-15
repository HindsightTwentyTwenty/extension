import * as types from '../constants/ActionTypes';

//if no valid username:
function userReducer(state = {user_name:"", token:"", forgot:false, invalid_login:false, create_user:false, change_password: false}, action){

  switch(action.type){
    case types.RECEIVE_USER_TOKEN:
      chrome.storage.local.set({"hindsite-token": action.token});
      return Object.assign({}, {user_name:action.user_name, token:action.token, forgot: false, invalid_login:false, create_user: false, change_password: false});
    case types.USER_ERROR:
      return Object.assign({}, {user_name: state.user_name, token:state.token, forgot: state.forgot, invalid_login:true, create_user: false, change_password: false});
    case types.RECEIVE_USER_TOKEN_FROM_CHROME:
      if(action.token != null && action.token['hindsite-token'] != null){
        return Object.assign({}, {user_name: state.user_name, token:action.token['hindsite-token'], forgot: false, invalid_login:false, create_user: false, change_password: false});
      } else {
        return state;
      }
    case types.FORGOT_MY_PASSWORD_PAGE:
      return Object.assign({}, {user_name: state.user_name, token:state.token, forgot: action.forgot, invalid_login:false, create_user: false, change_password: false});
    case types.CREATE_NEW_USER:
      return Object.assign({}, {user_name: state.user_name, token:state.token, forgot: state.forgot, invalid_login:false, create_user: action.create_user, change_password: false});
      // return {...state, create_user: action.create_user}
    case types.CHANGE_PASSWORD:
      return { ...state, change_password: action.change_password }
    case types.TEST:
      console.log("TEST IN REDUCER");
      return state;

      //return [...state, forgot=action.forgot];
    default:
        return state;
  }
}

export default userReducer;
