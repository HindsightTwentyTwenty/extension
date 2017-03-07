import * as types from '../../constants/ActionTypes';
import * as urls from '../../constants/GlobalConstants';
import fetch from 'isomorphic-fetch'
import * as PasswordConstants from '../../constants/PasswordConstants.js'
import * as PopupConstants from '../../constants/PopupConstants.js'
import * as Url from '../../constants/UrlBlacklist.js'
import ApiUtils from './../ApiUtils.js'

import * as PopupActions from '../Popup/PopupActions.js';

const loginUserEndpoint = urls.BASE_URL + "login/";
const logoutEndpoint = urls.BASE_URL + "logout/";
const newPageEndpoint = urls.BASE_URL + "newpage/";
const pageInfoEndpoint = urls.BASE_URL + "checkcategories/";
const activePageInfoEndpoint = urls.BASE_URL + "activepage/";
const changePasswordEndpoint = urls.BASE_URL + 'change/';
const userInfoEndpoint = urls.BASE_URL + 'userinfo/';

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

export function receiveUserTokenFromChrome(token) {
  return dispatch => {
    if(token['hindsite-token']){
      dispatch(
        {
         type: types.RECEIVE_USER_TOKEN_FROM_CHROME,
         token: token
       }
     ),
      dispatch(checkCurrentPage(token['hindsite-token']))
    }
    else {
      dispatch(updatePopupStatus(PopupConstants.SignIn))
    }
  }
}

export function setTabUrl(url){
  return {

  }
}

export function checkCurrentPage(token){
  console.log("check current page", token);
  return dispatch => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      var tab = tabs[0];
      console.log("got tab", tab);

      if(Url.isUrlBlacklisted(tab.url)){
        // Display message to navigate to a different page
        return dispatch(updatePopupStatus(PopupConstants.NoContent))

      } else {
        // fetch category information to display in the popup
        return [
          // dispatch(getPageInformation(tab.url, token, 0)),
          dispatch(PopupActions.getPopupInfo(tab.url, token))
        ]
      }

    });
  }

}

export function getPageInformation(url, token, count){

  return dispatch => {
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
              dispatch(updatePopupStatus(PopupConstants.Blacklist));
              break;
            default:
              // Defualt in case of non-expected error code
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

// function receivePageInfo(json) {
//   return {
//     type: types.RECEIVE_PAGE_INFO,
//     categories: json.categories,
//     url: json.url,
//     star: json.star,
//     title: json.title
//   }
// }

// function getPageInfo(url, token){
//
//   return dispatch => {
//     return fetch(pageInfoEndpoint, {
//           headers: {
//              'Accept': 'application/json',
//              'Content-Type': 'application/json',
//              'Authorization': "Token " + token
//            },
//            method: "POST",
//            body: JSON.stringify({url: url})
//          }
//        )
//       .then(response => response.json())
//       .then(json => dispatch(receivePageInfo(json)))
//   }
// }

export function updatePopupStatus(status){
  return {
    type: types.POPUP_STATUS,
    popup_status: status
  }
}

export function sendCurrentPage(token) {

  return dispatch => {

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      var tab = tabs[0];

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
            } else {
              // dispatch(receivePageInfo(json));
              checkCurrentPage(token);
            }
          }
        )
      } else {
        dispatch(updatePopupStatus(PopupConstants.NoContent));
      }
    });
  }
}

export function error(response){
  return {
    type: types.TEST
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
          dispatch(receiveUserTokenFromChrome(json['token']))
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
    created_at: json.created_at
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
          console.log("User info", json);
          dispatch(receiveUserInfo(json))
        }
      }
    )
  }
}
