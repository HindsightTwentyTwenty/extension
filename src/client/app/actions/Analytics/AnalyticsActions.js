import * as types from '../../constants/ActionTypes';
import * as urls from '../../constants/GlobalConstants';
import fetch from 'isomorphic-fetch';
import ApiUtils from './../ApiUtils.js';

const analyticsEndpoint = urls.BASE_URL + 'analytics/';

export function receiveAnalytics(json) {
  return {
    type: types.RECEIVE_ANALYTICS,
    page_visits: json.page_visits,
    user_domains: json.user_domains,
    user_pages: json.user_pages
  }
}

export function getAnalytics(token){
  return dispatch => {
    return fetch(analyticsEndpoint, {
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
          console.log("Analytics", json)
          dispatch(receiveAnalytics(json))
        }
      }
    )
  }
}


export function changeRange(period, new_type) {
  return dispatch => {
    dispatch({
      type: types.CHANGE_RANGE,
      period: period,
      new_type: new_type
    })
  }
}

export function activeUserDomain(domain) {
  return dispatch => {
    dispatch({
      type: types.CHANGE_USER_DOMAIN,
      user_domain: domain
    })
  }
}
