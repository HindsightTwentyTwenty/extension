import * as types from '../../constants/ActionTypes';
import * as urls from '../../constants/GlobalConstants';
import fetch from 'isomorphic-fetch'

const getTabsEndpoint = urls.BASE_URL + "tabinfo/";

export function receiveTabs(json) {
  return {
    type: types.RECEIVE_TABS,
    tabs: json
  }
}

// TODO: add requests for specific users
export function requestTabs() {
  return {
    type: types.REQUEST_TABS
  }
}

export function getAllTabs(start_date, end_date, token){

  return dispatch => {
    dispatch(requestTabs())
    return fetch(getTabsEndpoint, {
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': "Token " + token
             },
             method: "POST",
             body: JSON.stringify({"start": start_date, "end": end_date})
           }
      )
      .then(response => response.json())
      .then(json => dispatch(receiveTabs(json)))
  }
}
