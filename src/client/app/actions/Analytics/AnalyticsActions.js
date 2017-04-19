import * as types from '../../constants/ActionTypes';
import * as urls from '../../constants/GlobalConstants';
import fetch from 'isomorphic-fetch';
import ApiUtils from './../ApiUtils.js';

const analyticsEndpoint = urls.BASE_URL + 'analytics/';

export function receiveAnalytics(json) {
  return {
    type: types.RECEIVE_ANALYTICS,
    page_visits: json.page_visits,
    tag_cloud: json.tag_cloud
  }
}

export function getAnalytics(token){
  return dispatch => {
    var d = new Date()
    var offset = d.getTimezoneOffset();
    return fetch(analyticsEndpoint, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Token " + token
      },
      method: "POST",
      body: JSON.stringify({"offset": offset})
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
          console.log("Analytics", json)
          dispatch(receiveAnalytics(json))
        }
      }
    )
  }
}


export function changeRange(range) {
  return dispatch => {
    dispatch({
      type: types.CHANGE_RANGE,
      range: range
    })
  }
}
