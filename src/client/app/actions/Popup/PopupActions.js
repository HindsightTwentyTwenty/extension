import * as types from '../../constants/ActionTypes';
import * as urls from '../../constants/GlobalConstants';
import fetch from 'isomorphic-fetch';
import ApiUtils from './../ApiUtils.js';

import * as PopupConstants from '../../constants/PopupConstants.js';

const pageInfoEndpoint = urls.BASE_URL + "checkcategories/";
const newSessionEndpoint = urls.BASE_URL + "addsession/";
const popupInfoEndpoint = urls.BASE_URL + "popupinfo/";

export function receivePopupInfo(json){
  return {
    type: types.RECEIVE_POPUP_INFO,
    categories: json.categories,
    page: json.page,
    tracking_on: json.tracking
  }
}

export function receiveTrackingOffPopupInfo(json, url, title){
  return {
    type: types.RECEIVE_TRACKING_OFF_POPUP_INFO,
    categories: json.categories,
    url: url,
    title: title,
    tracking_on: json.tracking
  }
}

export function getPopupInfo(url, title, token, count){
  console.log("GET POPUP INFO CALLED", url, title, token, count);
  return dispatch => {
    return fetch(popupInfoEndpoint, {
          headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Authorization': 'Token ' + token
           },
           method: "POST",
           body: JSON.stringify({url: url})
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
           switch(status){
             case 200:
               dispatch(receivePopupInfo(json));
               break;
             case 404:
               // Page Not found in backend. Check if tracking is on
               if(json.tracking){
                 // Try again as page might be loading if under max count
                 if(count < 5){
                   setTimeout(function() { dispatch(getPopupInfo(url, title, token, count + 1)); }, 1000);
                 } else {
                   dispatch(updatePopupStatus(PopupConstants.Error));
                 }
               } else {
                 // Set current Page to page recevied from chrome anyways
                 dispatch(receiveTrackingOffPopupInfo(json, url, title));
               }
               break;
             case 201:
               // User has blacklisted this url
               dispatch(updatePopupStatus(PopupConstants.Blacklist));
               break;
             default:
               dispatch(updatePopupStatus(PopupConstants.Error));
               break;
           }
         }
       )
  }
}

export function updatePopupStatus(status){
  return {
    type: types.POPUP_STATUS,
    popup_status: status
  }
}

export function changePopupTab(id) {
  return dispatch => {
    dispatch({
      type: types.CHANGE_POPUP_TAB,
      tabId: id
    })
  }
}

export function setDuration(id) {
  return dispatch => {
    dispatch({
      type: types.SET_DURATION_ID,
      durationId: id
    })
  }
}

export function addSession(token, sessionTitle, sessionStart, sessionEnd) {
  return dispatch => {
    return fetch(newSessionEndpoint, {
          headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Authorization': "Token " + token
           },
           method: "POST",
           body: JSON.stringify({title: sessionTitle, start: sessionStart, end: sessionEnd})
         }
       )
      .then(response => response.json())
      .then(json => dispatch({
        type: types.RECEIVE_ADDED_SESSION,
        currentSession: {
          title: json.title,
          start: json.start,
          end: json.end
        }
      }))
  }
}
