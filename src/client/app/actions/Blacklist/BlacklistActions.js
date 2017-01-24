import * as types from '../../constants/ActionTypes';
import * as urls from '../../constants/GlobalConstants';
import fetch from 'isomorphic-fetch'

const removeFromBlacklistEndpoint = urls.BASE_URL + "deleteblacklist/";
const addToBlacklistEndpoint = urls.BASE_URL + "addblacklist/";
const editBlacklistEndpoint = urls.BASE_URL + "editblacklist/"; //todo
const getAllBlackListEndpoint = urls.BASE_URL + "blacklists/"; //todo

export function fetchBlacklist(token) {
  return dispatch => {
    return fetch(getAllBlackListEndpoint, {
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': 'Token ' + token
       },
       method: "GET"
    })
      .then(response => response.json())
      .then(json => dispatch({
        type: types.RECEIVE_BLACKLIST,
        blacklist: json
      }))
  }
}

export function removeFromBlacklist(pagePk, token) {
  return dispatch => {
    dispatch({
      type: types.REMOVE_FROM_BLACKLIST,
      pk: pagePk
    })
    return fetch(removeFromBlacklistEndpoint, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token
      },
      method: "POST",
      body: JSON.stringify({pk: pagePk})
    })
  }
}

export function addToBlacklist(domain, token) {
  return dispatch => {
    return fetch(addToBlacklistEndpoint, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token
      },
      method: "POST",
      body: JSON.stringify({blacklist: domain})
    })
    .then(response => response.json())
    .then(json => dispatch({
      type: types.ADD_TO_BLACKLIST,
      blacklistedSite : json
    }))
  }
}
