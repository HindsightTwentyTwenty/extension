import * as types from '../../constants/ActionTypes';
import * as urls from '../../constants/GlobalConstants';
import fetch from 'isomorphic-fetch';
import ApiUtils from './../ApiUtils.js';

const analyticsEndpoint = urls.BASE_URL + 'analytics/';
const addProcrastinationEndpoint = urls.BASE_URL + 'addprocrastination/';
const removeProcrastinationEndpoint = urls.BASE_URL + 'removeprocrastination/';

export function receiveAnalytics(json) {
  return {
    type: types.RECEIVE_ANALYTICS,
    page_visits: json.page_visits,
    user_domains: json.user_domains,
    hindsite_domains: json.hindsite_domains,
    user_pages: json.user_pages,
    productivity: json.productivity
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

export function addProcrastination(domain, token) {
  return dispatch => {
    return fetch(addProcrastinationEndpoint, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token
      },
      method: "POST",
      body: JSON.stringify({domain: domain})
    })
    .then(response => response.json())
    .then(json => dispatch({
      type: types.UPDATE_PROCRASTINATION,
      sites: json.procrastination_sites
    }))
  }
}

export function removeProcrastination(domain, token) {
  return dispatch => {
    return fetch(removeProcrastinationEndpoint, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token
      },
      method: "POST",
      body: JSON.stringify({domain: domain})
    })
    .then(response => response.json())
    .then(json => dispatch({
      type: types.UPDATE_PROCRASTINATION,
      sites: json.procrastination_sites
    }))
  }
}
