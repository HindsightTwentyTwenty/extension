import * as types from '../../constants/ActionTypes';
import * as urls from '../../constants/GlobalConstants';
import fetch from 'isomorphic-fetch'

const getTabsEndpoint = urls.BASE_URL + "tabinfo/";

export function getAllTabs(start_date, end_date, token){
  return dispatch => {
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
      .then(json => dispatch({
        type: types.RECEIVE_TABS,
        tabs: json
      }
    ))
  }
}
