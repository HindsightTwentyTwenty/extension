import * as types from '../../constants/ActionTypes';
import * as urls from '../../constants/GlobalConstants';
import fetch from 'isomorphic-fetch'
// import store from '../../index.js'



const loginUserEndpoint = urls.BASE_URL + "login/";
var curr_token = ""

export function receiveUserToken(json, username) {
  console.log("RECEIVE USER TOKEN: ", json.token);
  console.log("RECEIVE USER name: ", username);

  return {
    type: types.RECEIVE_USER_TOKEN,
    token: json.token,
    user_name: username
  }
}


export function receiveError(error) {
  console.log("RECEIVE error: ", error);

  return {
    type: types.RECEIVE_ERROR,
    error: error

  }
}

export function receiveLoginError() {
  console.log("Invalid login credentials");

  return {
    type: types.USER_ERROR
  }
}

export function requestUserToken() {
  return {
    type: types.REQUEST_USER_TOKEN
  }
}

function checkStatus(response){
  if(response.status == 200){
    return true;
  }else{
    return false;
  }
}

export function userToken(token) {
 return {
   type: types.RECEIVE_USER_TOKEN_FROM_CHROME,
   token: token
 }
}

export function receiveUserTokenFromChrome(token) {
 return dispatch => {
   return dispatch(userToken(token))
 }
}

export function clearStore(){
  return {
    type: types.USER_LOGOUT
  }
}

export function logoutUser() {
  return dispatch => {
    return fetch(urls.BASE_URL + '/logout/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
    })
    .then(dispatch(clearStore()))
  }
}


export function loginUser(username, password){
  return dispatch => {
    dispatch(requestUserToken())
    return fetch(loginUserEndpoint, {
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
             },
             method: "POST",
             body: JSON.stringify({"email": username, "password": password})
           }
      )
      .then(response =>
        response.json().then(json => ({
          status: response.status,
          json
        })
      ))
      .then(
        ({ status, json }) => {
          if(status == 401){
            console.log("Invalid post caught");
            dispatch(receiveLoginError());
          } else {
            console.log("valid post", json);
            console.log("username", username);
            dispatch(receiveUserToken(json, username))
          }
        }
      )


        //json => dispatch(receiveUserToken(json, username)))

  }
}

export function forgotMyPasswordEmailSubmit(email){
  return dispatch => {
    return fetch(urls.BASE_URL + '/forgot/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({"email": email})
    })
    .then(dispatch(clearStore()))
  }
}

export function forgotMyPasswordPage(value){
  return dispatch => {
    return dispatch({
      type: types.FORGOT_MY_PASSWORD_PAGE,
      forgot: value
    })
  }
}
