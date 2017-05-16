import * as types from '../../constants/ActionTypes';
import * as urls from '../../constants/GlobalConstants';
import fetch from 'isomorphic-fetch';
import ApiUtils from './../ApiUtils.js';

import * as PopupConstants from '../../constants/PopupConstants.js';

const pageInfoEndpoint = urls.BASE_URL + "checkcategories/";
const newSessionEndpoint = urls.BASE_URL + "addsession/";
const popupInfoEndpoint = urls.BASE_URL + "popupinfo/";

export function receivePopupInfo(json){
  console.log("receivePopupInfo(json)1");
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

export function getPageInfo(token, count){
  console.log("NEW getPageInfo(token, count)1");
  return chrome.storage.local.get(["taburl", "tabtitle", "hindsite-token"], receivePageInfo);
}

export function receivePageInfo(items){
  console.log("getPopupInfo()");
  console.log("ITEMS", items);
    var url = items['taburl'];
    var title = items['tabtitle'];
    var token = items['hindsite-token'];

    console.log("url", url);
    console.log("title", title);
    console.log("token", token);
    console.log("ended receivePageInfo");
    getPopupInfo(url, title, token, 0);
    // return fetch(popupInfoEndpoint, {
    //       headers: {
    //          'Accept': 'application/json',
    //          'Content-Type': 'application/json',
    //          'Authorization': 'Token ' + token
    //        },
    //        method: "POST",
    //        body: JSON.stringify({url: url})
    //      }
    //    )
    //    .then(response =>
    //      response.json().then(json => ({
    //        status: response.status,
    //        json
    //      })
    //    ))

  // return dispatch => {
  //   return fetch(popupInfoEndpoint, {
  //         headers: {
  //            'Accept': 'application/json',
  //            'Content-Type': 'application/json',
  //            'Authorization': 'Token ' + token
  //          },
  //          method: "POST",
  //          body: JSON.stringify({url: url})
  //        }
  //      )
  //     //  .then(response =>
  //     //    response.json().then(json => ({
  //     //      status: response.status,
  //     //      json
  //     //    })
  //     //  ))
  //     //  .then(
  //     //    ({ status, json }) => {
  //     //      switch(status){
  //     //        case 200:
  //     //          dispatch(receivePopupInfo(json));
  //     //          break;
  //     //        case 404:
  //     //          // Page Not found in backend. Check if tracking is on
  //     //          if(json.tracking){
  //     //            // Try again as page might be loading if under max count
  //     //           //  if(count < 5){
  //     //           //    setTimeout(function() { dispatch(getPopupInfo( token, count + 1)); }, 1000);
  //     //           //  } else {
  //     //              dispatch(updatePopupStatus(PopupConstants.Error));
  //     //           //  }
  //     //          } else {
  //     //            // Set current Page to page recevied from chrome anyways
  //     //            dispatch(receiveTrackingOffPopupInfo(json, url, title));
  //     //          }
  //     //          break;
  //     //        case 201:
  //     //          // User has blacklisted this url
  //     //          dispatch(updatePopupStatus(PopupConstants.Blacklist));
  //     //          break;
  //     //        default:
  //     //          dispatch(updatePopupStatus(PopupConstants.Error));
  //     //          break;
  //     //      }
  //     //    }
  //     //  )
  // };
}

export function dispatchPopupInfo(status, json){
  console.log("dispatchPopupInfo()");
  console.log("status1", status);
  console.log("json", json);

         switch(status){
           case 200:
             console.log("got it, should dispatch now1");
             return receivePopupInfo(json);
             break;
           case 404:
             // Page Not found in backend. Check if tracking is on
             if(json.tracking){
               // Try again as page might be loading if under max count
              //  if(count < 5){
              //    setTimeout(function() { dispatch(getPopupInfo(url, title, token, count + 1)); }, 1000);
              //  } else {
              return dispatch => {
                 return dispatch(updatePopupStatus(PopupConstants.Error));
              }
               //}
             } else {
               // Set current Page to page recevied from chrome anyways
               return dispatch => {
               dispatch(receiveTrackingOffPopupInfo(json, url, title));
             }
             }
             break;
           case 201:
             // User has blacklisted this url
             return dispatch => {
             dispatch(updatePopupStatus(PopupConstants.Blacklist));
           }
             break;
           default:
              return dispatch => {
             dispatch(updatePopupStatus(PopupConstants.Error));
           }
             break;
         }

}

export function getPopupInfo(url, title, token, count){
  console.log("SENDING TO POPUP INFO test5");
  // return dispatch => {
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
           dispatchPopupInfo(status, json)
         })
      //      switch(status){
      //        case 200:
      //          dispatch(receivePopupInfo(json));
      //          break;
      //        case 404:
      //          // Page Not found in backend. Check if tracking is on
      //          if(json.tracking){
      //            // Try again as page might be loading if under max count
      //            if(count < 5){
      //              setTimeout(function() { dispatch(getPopupInfo(url, title, token, count + 1)); }, 1000);
      //            } else {
      //              dispatch(updatePopupStatus(PopupConstants.Error));
      //            }
      //          } else {
      //            // Set current Page to page recevied from chrome anyways
      //            dispatch(receiveTrackingOffPopupInfo(json, url, title));
      //          }
      //          break;
      //        case 201:
      //          // User has blacklisted this url
      //          dispatch(updatePopupStatus(PopupConstants.Blacklist));
      //          break;
      //        default:
      //          dispatch(updatePopupStatus(PopupConstants.Error));
      //          break;
      //      }
      //    }
      //  )
  // }
}


// export function getPopupInfo(token, count){
//   console.log("token", token);
//   var url = "";
//   var title = "";
//   chrome.storage.local.get(null, function(items) {
//     console.log("response in popup", items);
//     url = items['taburl'];
//     title = items['tabtitle'];
//
//
//   console.log("GET POPUP INFO CALLED", url, title, token, count);
//
// }).then(
//   return dispatch => {
//     console.log("dispatching");
//     return fetch(popupInfoEndpoint, {
//           headers: {
//              'Accept': 'application/json',
//              'Content-Type': 'application/json',
//              'Authorization': 'Token ' + token
//            },
//            method: "POST",
//            body: JSON.stringify({url: url})
//          }
//        )
//        .then(response =>
//          response.json().then(json => ({
//            status: response.status,
//            json
//          })
//        ))
//        .then(
//          ({ status, json }) => {
//            switch(status){
//              case 200:
//                dispatch(receivePopupInfo(json));
//                break;
//              case 404:
//                // Page Not found in backend. Check if tracking is on
//                if(json.tracking){
//                  // Try again as page might be loading if under max count
//                  if(count < 5){
//                    setTimeout(function() { dispatch(getPopupInfo( token, count + 1)); }, 1000);
//                  } else {
//                    dispatch(updatePopupStatus(PopupConstants.Error));
//                  }
//                } else {
//                  // Set current Page to page recevied from chrome anyways
//                  dispatch(receiveTrackingOffPopupInfo(json, url, title));
//                }
//                break;
//              case 201:
//                // User has blacklisted this url
//                dispatch(updatePopupStatus(PopupConstants.Blacklist));
//                break;
//              default:
//                dispatch(updatePopupStatus(PopupConstants.Error));
//                break;
//            }
//          }
//        )
//   };
// )
// }

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
