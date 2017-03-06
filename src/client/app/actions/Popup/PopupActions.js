import * as types from '../../constants/ActionTypes';
import * as urls from '../../constants/GlobalConstants';
import fetch from 'isomorphic-fetch'

const pageInfoEndpoint = urls.BASE_URL + "checkcategories/";
const newSessionEndpoint = urls.BASE_URL + "addsession/"

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
