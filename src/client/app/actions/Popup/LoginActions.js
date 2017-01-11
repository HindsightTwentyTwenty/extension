import * as types from '../../constants/ActionTypes';
import * as urls from '../../constants/GlobalConstants';
import fetch from 'isomorphic-fetch'
// import getPageInfo from './PopupActions.js';
// import store from '../../index.js'



const loginUserEndpoint = urls.BASE_URL + "login/";
const newPageEndpoint = urls.BASE_URL + "newpage/";
const pageInfoEndpoint = urls.BASE_URL + "checkcategories/";

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

export function createNewUserPage(value) {
  return dispatch => {
    dispatch(
      {
       type: types.CREATE_NEW_USER,
       create_user: value
     }
   )
 }
}

export function receiveUserTokenFromChrome(token) {
  return dispatch => {
    dispatch(
      {
       type: types.RECEIVE_USER_TOKEN_FROM_CHROME,
       token: token
     }
    )
  }
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
  console.log("url", url);
  console.log("token", token);
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

//TODO Fix issue where current page is not sent on login
export function sendCurrentPage(token) {
  console.log("Send current Page triggered json: ", token);


  return dispatch => {

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      console.log("TAB", tabs);
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

            dispatch(sendCurrentPage(json['token']))
          }
        }
      )



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
