import * as types from '../../constants/ActionTypes';
import * as urls from '../../constants/GlobalConstants';
import fetch from 'isomorphic-fetch'

const updateStarEndpoint = urls.BASE_URL + "updatestar/";

export function updateStar(newStarVal) {
  return {
    type: types.UPDATE_CURRENT_STAR,
    star: newStarVal
  }
}

export function toggleStar(url, star){
  return dispatch => {
    dispatch(updateStar(star))
    return fetch(updateStarEndpoint, {
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
             },
             method: "POST",
             body: JSON.stringify({url: url, star: star})
           }
      )
      .then(response => response.json())
  }
}