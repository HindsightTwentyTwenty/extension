import * as types from '../../constants/ActionTypes';
import * as urls from '../../constants/GlobalConstants';
import fetch from 'isomorphic-fetch';
import ApiUtils from './../ApiUtils.js';

import * as PopupConstants from '../../constants/PopupConstants.js';

const pageInfoEndpoint = urls.BASE_URL + "checkcategories/";
const newSessionEndpoint = urls.BASE_URL + "addsession/";



export function receiveTrackingOffPopupInfo(json, url, title){
  return {
    type: types.RECEIVE_TRACKING_OFF_POPUP_INFO,
    categories: json.categories,
    url: url,
    title: title,
    tracking_on: json.tracking
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
