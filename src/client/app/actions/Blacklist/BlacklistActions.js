import * as types from '../../constants/ActionTypes';
import * as urls from '../../constants/GlobalConstants';
import fetch from 'isomorphic-fetch'

const removeFromBlacklistEndpoint = urls.BASE_URL + "PLACEHOLDER/";
const addToBlacklistEndpoint = urls.BASE_URL + "PLACEHOLDER/";

export function removeFromBlacklist(pageUrl, token) {
  return dispatch => {
    dispatch({
      type: types.REMOVE_FROM_BLACKLIST,
      url: pageUrl
    })
    return fetch(removeFromBlacklistEndpoint, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token
      },
      method: "POST",
      body: JSON.stringify({url: pageUrl})
    })
  }
}

export function addToBlacklist(pageUrl, token) {
  return dispatch => {
    dispatch({
      type: types.ADD_TO_BLACKLIST,
      url: pageUrl
    })
    return fetch(addToBlacklistEndpoint, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token
      },
      method: "POST",
      body: JSON.stringify({url: pageUrl})
    })
  }
}
