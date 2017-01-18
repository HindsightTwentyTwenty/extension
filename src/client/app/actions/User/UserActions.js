import * as types from '../../constants/ActionTypes';
import * as urls from '../../constants/GlobalConstants';
import fetch from 'isomorphic-fetch'
import * as PasswordConstants from '../../constants/PasswordConstants.js'

const loginUserEndpoint = urls.BASE_URL + "login/";
const logoutEndpoint = urls.BASE_URL + "logout/";
const newPageEndpoint = urls.BASE_URL + "newpage/";
const pageInfoEndpoint = urls.BASE_URL + "checkcategories/";
const changePasswordEndpoint = urls.BASE_URL + 'change/';

const unauthorizedCode = "403";

var curr_token = ""

export function receiveError(error) {
  console.log("RECEIVE error: ", error);

  return {
    type: types.RECEIVE_ERROR,
    error: error

  }
}

function checkStatus(response){
  if(response.status == 200){
    return true;
  }else{
    return false;
  }
}

export function createNewUserPage(value) {
  return dispatch => {
    dispatch({
       type: types.CREATE_NEW_USER,
       create_user: value
     }
   )
 }
}

export function receiveUserTokenFromChrome(token) {
  console.log("TOKEN: ", token);
  return dispatch => {
    dispatch(
      {
       type: types.RECEIVE_USER_TOKEN_FROM_CHROME,
       token: token
     }
    )
  }
 return dispatch => {
   return dispatch({
    type: types.RECEIVE_USER_TOKEN_FROM_CHROME,
    token: token
  })
 }
}

export function _checkStatus(response){
  console.log("checkStatus", response)
  // return {response, response.sta}
}

export function logoutUser(token) {
  return dispatch => {
    return fetch(logoutEndpoint, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Token " + token
      },
      method: "POST",
    })
    .then(response => {
      if (response['status'] != unauthorizedCode){
        console.log("logout failure");
        //TODO Implement user message warning of error on logout
      } else {
        console.log("succesful logout")
        // clear store
        dispatch({
          type: types.USER_LOGOUT
        })
      }
    })
  }
}

function receivePageInfo(json) {
  console.log("receive page info", json);
  return {
    type: types.RECEIVE_PAGE_INFO,
    categories: json.categories,
    url: json.url,
    star: json.star,
    title: json.title
  }
}

function getPageInfo(url, token){
  console.log("getPageInfo() url", url);
  console.log("getPageInfo() token", token);

  return dispatch => {
    return fetch(pageInfoEndpoint, {
          headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Authorization': "Token " + token
           },
           method: "POST",
           body: JSON.stringify({url: url})
         }
       )
      .then(response => response.json())
      .then(json => dispatch(receivePageInfo(json)))
  }
}

export function sendCurrentPage(token) {

  return dispatch => {

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      console.log("page: ", tabs[0]);
      var tab = tabs[0];
      var domain = tab.url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
      var closed = false
      if(tab.title && tab.url != 'chrome://newtab/'){
          fetch(newPageEndpoint, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': "Token " + token

            },
            method: "POST",
            body: JSON.stringify({"tab":tab.id, "title":tab.title, "domain":domain, "url":tab.url, "favIconUrl":tab.favIconUrl, "previousTabId": tab.openerTabId, "active": tab.active})
          }
        ).then(
          dispatch(getPageInfo(tab.url, token))
        )
      }
    });
  }
}

export function receivePageInfo(json) {
  console.log("receive page info", json);
  return {
    type: types.RECEIVE_PAGE_INFO,
    categories: json.categories,
    url: json.url,
    star: json.star,
    title: json.title
  }
}


export function loginUser(username, password){
  console.log("loginUser()");
  return dispatch => {
    return fetch(loginUserEndpoint, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({"email": username, "password": password})
    })
    .then(response =>
      response.json().then(json => ({
        status: response.status,
        json
        })
      )
    )
    .then(
      ({ status, json }) => {
        if(status == 401){
          console.log("Invalid post caught");
          dispatch(receiveLoginError());
        } else {
          console.log("valid post", json);
          dispatch({
            type: types.RECEIVE_USER_TOKEN,
            token: json.token,
            user_name: username
          })
          dispatch(sendCurrentPage(json['token']))
        }
      }
    )
  }
}

export function forgotMyPasswordEmailSubmit(email){
  return dispatch => {
    return fetch(urls.BASE_URL + 'forgot/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({"email": email})
    })
    // clear store
    .then(dispatch({
      type: types.USER_LOGOUT
    }))
  }
}

export function createNewUser(email, password_1, password_2, first_name, last_name){
  return dispatch => {
    return fetch(urls.BASE_URL + 'users/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({"email": email,
                            "password": password_1,
                            "first_name": first_name,
                            "last_name": last_name,
                            "confirm_password": password_2
                          })
    })
    .then(response => response.json())
    .then(json => dispatch(receiveUserTokenFromChrome(json['token'])))
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

export function changeMyPassword(current_password, new_password, token){
  ;
  return dispatch => {
    return fetch(changePasswordEndpoint, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Token " + token
      },
      method: "POST",
      body: JSON.stringify({"current_pw": current_password, "new_pw": new_password})
    })
    .then(response =>
      response.json().then(json => ({
        status: response.status,
        json
      })
    ))
    .then(
      ({ status, json }) => {
        if(status == 401){
          console.log("Invalid password for password change");
          dispatch(changeMyPasswordToggle(PasswordConstants.Unsuccesful))
        } else {
          console.log("valid post");
          dispatch(changeMyPasswordToggle(PasswordConstants.Succesful))
        }
      }
    )
  }
}

export function changeMyPasswordToggle(value){
  return dispatch => {
    return dispatch ({
      type: types.CHANGE_PASSWORD,
      change_password: value
    })
  }
}
