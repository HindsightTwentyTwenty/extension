import * as types from '../constants/ActionTypes';
import * as PasswordConstants from '../constants/PasswordConstants.js';
import * as PopupConstants from '../constants/PopupConstants.js';

//#TODO: GAM, take out login reduncencies? like invalid_login and messages in UserActions
//#TODO: do we ever need the ekey and md5 in local storage?
//if no valid username:
function userReducer(state = {user_name:"", first_name:"", last_name:"", email:"",
        created_at:"", token:"", invalid_login:false, change_password: PasswordConstants.Closed,
        md5:"", ekey:"", tracking_on:false}, action){

  switch(action.type){
    case types.RECEIVE_USER_TOKEN:
      chrome.storage.local.set({"hindsite-token": action.token, "md5":action.md5, "ekey":action.ekey});
      return { ...state, user_name:action.user_name, token:action.token, md5:action.md5, ekey:action.ekey, tracking_on: action.tracking_on}
    case types.USER_ERROR:
      return { ...state, invalid_login:true, invalid_login_message:action.error_message, create_user: false }
    case types.NO_USER_ERROR:
      return {...state, invalid_login:false}
    case types.RECEIVE_USER_TOKEN_FROM_CHROME:
      console.log("receiving user token IN REDUCER", action.token);
      if(action.token != null && action.token != null){
        return { ...state, token:action.token, invalid_login:false}
      } else {
        return state;
      }
    case types.RECEIVE_ENCRYPT_FROM_CHROME:
      return {...state, md5:action.md5, ekey:action.ekey}
    case types.CHANGE_PASSWORD:
      return { ...state, change_password: action.change_password }
    case types.RECEIVE_USER_INFO:
      return { ...state, user_name:action.username, first_name:action.first_name, last_name:action.last_name, email:action.email, created_at: action.created_at, tracking_on: action.tracking_on }
    case types.RECEIVE_TRACKING_OFF_POPUP_INFO:
      return { ...state, tracking_on: action.tracking_on }
    case types.RECEIVE_POPUP_INFO:
      return { ...state, tracking_on: action.tracking_on }
    case types.RECEIVE_TRACKING:
      return { ...state, tracking_on: action.tracking_on }
    default:
        return state;
  }
}

export default userReducer;
