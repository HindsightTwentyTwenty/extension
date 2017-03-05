import * as types from '../constants/ActionTypes';
import * as PasswordConstants from '../constants/PasswordConstants.js'
import * as PopupConstants from '../constants/PopupConstants.js'

//if no valid username:
function userReducer(state = {user_name:"", first_name:"", last_name:"", email:"", created_at:"", token:"", invalid_login:false, change_password: PasswordConstants.Closed, popup_status: PopupConstants.Loading}, action){

  switch(action.type){
    case types.RECEIVE_USER_TOKEN:
      chrome.storage.local.set({"hindsite-token": action.token});
      return { ...state, user_name:action.user_name, token:action.token, invalid_login:false}
    case types.USER_ERROR:
      return { ...state, invalid_login:true, invalid_login_message:action.error_message, create_user: false }
    case types.NO_USER_ERROR:
      return {...state, invalid_login:false}
    case types.RECEIVE_USER_TOKEN_FROM_CHROME:
      if(action.token != null && action.token['hindsite-token'] != null){
        return { ...state, token:action.token['hindsite-token'], invalid_login:false}
      } else {
        return state;
      }
    case types.CHANGE_PASSWORD:
      return { ...state, change_password: action.change_password }
    case types.POPUP_STATUS:
      return { ...state, popup_status: action.popup_status }
    case types.RECEIVE_PAGE_INFO:
      return { ...state, popup_status: PopupConstants.Received }
    case types.RECEIVE_USER_INFO:
      return { ...state, user_name:action.username, first_name:action.first_name, last_name:action.last_name, email:action.email, created_at: action.created_at }
    default:
        return state;
  }
}

export default userReducer;
