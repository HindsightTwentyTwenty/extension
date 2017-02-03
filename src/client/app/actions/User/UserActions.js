import * as types from '../../constants/ActionTypes';
import * as urls from '../../constants/GlobalConstants';
import fetch from 'isomorphic-fetch'
import * as PasswordConstants from '../../constants/PasswordConstants.js'
import * as PopupConstants from '../../constants/PopupConstants.js'
import * as Url from '../../constants/UrlBlacklist.js'
import ApiUtils from './../ApiUtils.js'

const loginUserEndpoint = urls.BASE_URL + "login/";
const logoutEndpoint = urls.BASE_URL + "logout/";
const newPageEndpoint = urls.BASE_URL + "newpage/";
const pageInfoEndpoint = urls.BASE_URL + "checkcategories/";
const activePageInfoEndpoint = urls.BASE_URL + "activepage/";
const changePasswordEndpoint = urls.BASE_URL + 'change/';

const unauthorizedCode = "403";

var curr_token = ""

export function receiveError(error) {
  // console.log("RECEIVE error: ", error);

  return {
    type: types.RECEIVE_ERROR,
    error: error

  }
}

export function receiveUserTokenFromChrome(token) {
  // console.log("TOKEN IN RECEIVE USER TOKEN: ", token);
  return dispatch => {
    // console.log("IN DISPATCH token[hindsite-token]:", token['hindsite-token']);
    if(token['hindsite-token']){
      // console.log("headed to grab page info");
      dispatch(
        {
         type: types.RECEIVE_USER_TOKEN_FROM_CHROME,
         token: token
       }
      )
      dispatch(checkCurrentPage(token['hindsite-token']))
      //dispatch(getPageInformation(token['hindsite-token'], 0))
    }
    else {
      dispatch(updatePopupStatus(PopupConstants.SignIn))
    }
  }
}

export function checkCurrentPage(token){
  return dispatch => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      var tab = tabs[0];
      console.log("Current tab is", tab);

      if(Url.isUrlBlacklisted(tab.url)){
        // Display message to navigate to a different page
        return dispatch(updatePopupStatus(PopupConstants.NoContent))

      } else {
        // fetch category information to display in the popup
        return dispatch(getPageInformation(tab.url, token, 0))
      }

    });
  }

}

export function getPageInformation(url, token, count){

  return dispatch => {
    // console.log("Token:", token);
    return fetch(pageInfoEndpoint, {
          headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Authorization': 'Token ' + token
           },
           method: "POST",
           body: JSON.stringify({url: url})
         }
       )
       .then(ApiUtils.checkStatus)
       .then(response => response.json())
       .then(json => {
         dispatch(receivePageInfo(json))
       })
       .catch(e => {

          switch (e) {
            case 404:
              console.log("404 caught");
              // Page does not exist in backend at this moment
              // Retry up to 5 times before displaying error message
              if(count < 5){
                setTimeout(function() { dispatch(getPageInformation(url, token, count + 1)); }, 1000);
              } else {
                dispatch(updatePopupStatus(PopupConstants.Error));
              }
              break;
            case 204:
              // User has blacklisted this url
              console.log("204 Blacklist caught");
              dispatch(updatePopupStatus(PopupConstants.Blacklist));
              break;
            default:
              // Defualt in case of non-expected error code
              console.log("default");
              dispatch(updatePopupStatus(PopupConstants.Error));
              break;
         }
        })
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

function receivePageInfo(json) {
  // console.log("receive page info", json);
  return {
    type: types.RECEIVE_PAGE_INFO,
    categories: json.categories,
    url: json.url,
    star: json.star,
    title: json.title
  }
}

function getPageInfo(url, token){
  // console.log("getPageInfo() url", url);
  // console.log("getPageInfo() token", token);

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

export function updatePopupStatus(status){
  // console.log("Update popup status", status);
  return {
    type: types.POPUP_STATUS,
    popup_status: status
  }
}

export function sendCurrentPage(token) {

  return dispatch => {

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      // console.log("page: ", tabs[0]);
      var tab = tabs[0];
      // console.log("Blacklist", Lists.Blacklist);
      // console.log("INDEX OF", Lists.Blacklist.indexOf(tab.url));
      // console.log("token in send current", token);

      var domain = tab.url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
      var closed = false
      if(tab.title && !Url.isUrlBlacklisted(tab.url)){
          fetch(newPageEndpoint, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': "Token " + token

            },
            method: "POST",
            body: JSON.stringify({"login": true, "tab":tab.id, "title":tab.title, "domain":domain, "url":tab.url, "favIconUrl":tab.favIconUrl, "previousTabId": tab.openerTabId, "active": tab.active})
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
            if(status == 204){
              // console.log("No content");
            } else {
              // console.log("valid receive", json);
              dispatch(receivePageInfo(json));
            }
          }
        )
      } else {
        // console.log("DISPATCHING NO CONTENT", tab.url)
        dispatch(updatePopupStatus(PopupConstants.NoContent));
      }
    });
  }
}

export function error(response){
  // console.log("error", response.json());
  return {
    type: types.TEST
  }
}

export function receivePageInfo(json) {
  // console.log("receive page info", json);
  return {
    type: types.RECEIVE_PAGE_INFO,
    categories: json.categories,
    url: json.url,
    star: json.star,
    title: json.title
  }
}


export function loginUser(username, password){
  // console.log("loginUser()");
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
          // console.log("Invalid post caught");
          dispatch(receiveLoginError());
        } else {
          // console.log("valid post", json);
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
          // console.log("Invalid password for password change");
          dispatch(changeMyPasswordToggle(PasswordConstants.Unsuccesful))
        } else {
          // console.log("valid post");
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
