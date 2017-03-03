import * as types from '../../constants/ActionTypes';
import * as urls from '../../constants/GlobalConstants';
import fetch from 'isomorphic-fetch'

const updateStarEndpoint = urls.BASE_URL + "updatestar/";

export function toggleStar(updateCurrent, page, token){
  var dispatchType = updateCurrent ? types.UPDATE_CURRENT_STAR : types.TOGGLE_STAR;
  var starUpdate = !page.star;
  return dispatch => {
    dispatch({
      type: dispatchType,
      page: page
    })
    return fetch(updateStarEndpoint, {
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': "Token " + token
             },
             method: "POST",
             body: JSON.stringify({url: page.url, star: starUpdate})
           }
      )
      .then(response => response.json())
  }
}
