import * as types from '../../constants/ActionTypes';
import * as urls from '../../constants/GlobalConstants';
import fetch from 'isomorphic-fetch';
import ApiUtils from './../ApiUtils.js';

const pageInfoEndpoint = urls.BASE_URL + "checkcategories/";
const newSessionEndpoint = urls.BASE_URL + "addsession/";
const popupInfoEndpoint = urls.BASE_URL + "popupinfo/";

// export function getPageInfo(token){
//   return dispatch => {
//     return fetch(pageInfoEndpoint, {
//           headers: {
//              'Accept': 'application/json',
//              'Content-Type': 'application/json',
//              'Authorization': 'Token ' + token
//            },
//            method: "POST"
//          }
//        )
//       .then(response => response.json())
//       .then(json => dispatch({
//         type: types.RECEIVE_PAGE_INFO,
//         categories: json.categories,
//         url: json.url,
//         star: json.star,
//         title: json.title
//       })
//     )
//   }
// }

export function receivePopupInfo(json){
  console.log("receviedpopupinfo", json)
  return {
    type: types.RECEIVE_POPUP_INFO,
    categories: json.categories,
    page: json.page,
    tracking_on: json.tracking
  }

}

export function getPopupInfo(url, token){
  console.log("getting popup info", url, token);
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
       .then(ApiUtils.checkStatus)
       .then(response => response.json())
       .then(json => {
         console.log("info endpt", json);
         dispatch(receivePopupInfo(json))
       })
       .catch(e => {
         console.log("error in get popup info", e );
       })

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
