import * as types from '../../constants/ActionTypes';
import * as urls from '../../constants/GlobalConstants';
import fetch from 'isomorphic-fetch';
import * as PasswordConstants from '../../constants/PasswordConstants.js';
import * as PopupConstants from '../../constants/PopupConstants.js';
import * as Url from '../../constants/UrlBlacklist.js';
import ApiUtils from './../ApiUtils.js';

import * as PopupActions from '../Popup/PopupActions.js';

const loginUserEndpoint = urls.BASE_URL + "login/";
const logoutEndpoint = urls.BASE_URL + "logout/";
const newPageEndpoint = urls.BASE_URL + "newpage/";
const pageInfoEndpoint = urls.BASE_URL + "checkcategories/";
const activePageInfoEndpoint = urls.BASE_URL + "activepage/";
const changePasswordEndpoint = urls.BASE_URL + 'change/';
const userInfoEndpoint = urls.BASE_URL + 'userinfo/';
const trackingEndpoint = urls.BASE_URL + 'tracking/';
const popupInfoEndpoint = urls.BASE_URL + "popupinfo/";


const unauthorizedCode = "403";

var curr_token = ""

export function receiveError(error) {
  return {
    type: types.RECEIVE_ERROR,
    error: error

  }
}

export function receiveLoginError(message){
  return {
    type: types.USER_ERROR,
    error_message: message

  }
}

export function receiveCreateUserError(message, error_type){
  return {
    type: error_type,
    error_message: message
  }
}

export function endErrorMessage(json){
  return {
    type: types.NO_USER_ERROR
  }
}

/* get items from chrome storage- token, encrypt key, md5 */
export function receiveFromChrome(token_response) {
  console.log("token_response", token_response);
  var token = token_response['hindsite-token'];
  return dispatch => {
    if(token){
      dispatch(
        {
         type: types.RECEIVE_USER_TOKEN_FROM_CHROME,
         token: token,
       }
     ),
      dispatch(streamlinePageInfo(token_response)),
      dispatch(getUserInfo(token))
    }
    else {
      dispatch(PopupActions.updatePopupStatus(PopupConstants.SignIn))
    }
    if(token_response['md5'] && token_response['ekey']){
      dispatch({
          type: types.RECEIVE_ENCRYPT_FROM_CHROME,
          md5: token_response['md5'],
          ekey: token_response['ekey']
      })
    }

  }
}

export function streamlinePageInfo(items){
    var url = items['taburl'];
    var title = items['tabtitle'];
    var token = items['hindsite-token'];
    console.log("urlTWO", url);
    console.log("title", title);
    console.log("token", token);

    return dispatch => {
      fetch(popupInfoEndpoint, {
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': 'Token ' + token
             },
             method: "POST",
             body: JSON.stringify({url: url})
           }
         ).then(response =>
            response.json().then(json => ({
              status: response.status,
              json
            })
          ))
          .then(
            ({ status, json }) => {
              switch(status){
                case 200:
                   dispatch(receivePopupInfo(json));
                   break;
                case 404:
                   // Page Not found in backend. Check if tracking is on
                   if(json.tracking){
                     // Try again as page might be loading if under max count
                     //#TODO: get COUNT working, thinking about how to check if this is NEW PAGE INFO 
                     if(count < 5){
                       setTimeout(function() { dispatch(getPopupInfo(url, title, token, count + 1)); }, 1000);
                     } else {
                       dispatch(PopupActions.updatePopupStatus(PopupConstants.Error));
                     }
                   } else {
                     // Set current Page to page recevied from chrome anyways
                     dispatch(receiveTrackingOffPopupInfo(json, url, title));
                   }
                   break;
                case 201:
                   // User has blacklisted this url
                   dispatch(PopupActions.updatePopupStatus(PopupConstants.Blacklist));
                   break;
                default:
                   dispatch(PopupActions.updatePopupStatus(PopupConstants.Error));
                   break;
              }
            }
          )
        }

    console.log("ended streamline");

    //TODO: gam HANDLE BLACKLISTING
      // if(Url.isUrlValid(taburl)){
      //   console.log("url blacklisted");
      //   // Display message to navigate to a different page
      //   return dispatch(PopupActions.updatePopupStatus(PopupConstants.NoContent))

}

export function receivePopupInfo(json){
  console.log("receivePopupInfo(json)1");
  return {
      type: types.RECEIVE_POPUP_INFO,
      categories: json.categories,
      page: json.page,
      tracking_on: json.tracking
  }
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
        // console.log("logout failure");
        //TODO Implement user message warning of error on logout
      } else {
        // console.log("succesful logout")
        // clear store
        dispatch({
          type: types.USER_LOGOUT
        })
      }
    })
  }
}

export function sendCurrentPage(token) {
  return dispatch => {
    console.log("sendCurrentPage(token)");
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      var tab = tabs[0];
      if(tab.title && !Url.isUrlValid(tab.url)){
        chrome.tabs.sendMessage(tab.id, {text: 'get_dom'}, function(dom){
          var lastError = chrome.runtime.lastError;
          if (lastError) {
            var dom = "";
          }else{
            var strippedDom = dom.replace(/<script([^'"]|"(\\.|[^"\\])*"|'(\\.|[^'\\])*')*?<\/script>/gi, "");
          }
          var domain = tab.url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
          fetch(newPageEndpoint, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': "Token " + token
            },
            method: "POST",
            body: JSON.stringify({"login": true, "tab":tab.id, "title":tab.title, "domain":domain, "url":tab.url, "favIconUrl":tab.favIconUrl, "previousTabId": tab.openerTabId, "active": tab.active, "html": strippedDom})
          })
          .then(response =>
            response.json().then(json => ({
              status: response.status,
              json
            })
          ))
          .then(
            ({ status, json }) => {
              if(status == 204){
                dispatch(PopupActions.updatePopupStatus(PopupConstants.Blacklist));
              } else {
                dispatch(receivePageInfo(json));
              }
            }
          )
        });
      } else {
        dispatch(PopupActions.updatePopupStatus(PopupConstants.NoContent));
      }
    })
  }
}

export function receivePageInfo(json) {
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
          dispatch(receiveLoginError(json['message']));
        } else {
          dispatch({
            type: types.RECEIVE_USER_TOKEN,
            token: json.token,
            md5: json.md5,
            ekey: json.key,
            json: json,
            user_name: username,
            tracking_on: json.tracking_on
          }),
          dispatch({
            type: types.RECEIVE_CATEGORIES,
            categories: json.categories
          }),
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
          dispatch(receiveLoginError(json['message']));
        } else {
          dispatch(receiveFromChrome(json['token']))
        }
      }
    )
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
          dispatch(changeMyPasswordToggle(PasswordConstants.Unsuccesful))
        } else {
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

export function receiveUserInfo(json) {
  return {
    type: types.RECEIVE_USER_INFO,
    username: json.username,
    email: json.email,
    first_name: json.first_name,
    last_name: json.last_name,
    created_at: json.created_at,
    tracking_on: json.tracking_on
  }
}

export function getUserInfo(token){
  return dispatch => {
    return fetch(userInfoEndpoint, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Token " + token
      },
      method: "GET"
    })
    .then(response =>
      response.json().then(json => ({
        status: response.status,
        json
      })
    ))
    .then(
      ({ status, json }) => {
        if(status == 200){
          dispatch(receiveUserInfo(json))
        }
      }
    )
  }
}

export function sendBackendTracking(tracking_on, token){
  return dispatch => {
    if(tracking_on){
      console.log("tracking coming on. sending current page with it");
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        var tab = tabs[0];
        chrome.tabs.sendMessage(tab.id, {text: 'get_dom'}, function(dom){
          var lastError = chrome.runtime.lastError;
          if (lastError) {
            var dom = "";
          }else{
            var strippedDom = dom.replace(/<script([^'"]|"(\\.|[^"\\])*"|'(\\.|[^'\\])*')*?<\/script>/gi, "");
          }

          var domain = tab.url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
          return fetch (trackingEndpoint, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': "Token " + token
            },
            method: "POST",
            body: JSON.stringify({"tracking": tracking_on, "tab":tab.id, "title":tab.title, "domain":domain, "url":tab.url, "favIconUrl":tab.favIconUrl, "previousTabId": tab.openerTabId, "active": tab.active })
          })
          .then(response => {
            console.log("tracking on response", response);
          })
        })
      })
    } else {
      return fetch (trackingEndpoint, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Token " + token
        },
        method: "POST",
        body: JSON.stringify({"tracking": tracking_on })
      })
      .then(response => {
        console.log("tracking off response", response);
      })
    }
  }
}

export function toggleTracking(tracking_on, token){
  return dispatch => {
    return [
      dispatch(sendBackendTracking(tracking_on, token)),
      dispatch({
        type: types.RECEIVE_TRACKING,
        tracking_on: tracking_on
      })
    ]
  }
}
