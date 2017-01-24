import * as types from '../../constants/ActionTypes';
import * as urls from '../../constants/GlobalConstants';
import fetch from 'isomorphic-fetch'

const updateStarEndpoint = urls.BASE_URL + "updatestar/";

export function updateStar() {
  return {
    type: types.UPDATE_CURRENT_STAR,
  }
}

export function toggleStar(page, token){
  return dispatch => {
    dispatch(updateStar())
    return fetch(updateStarEndpoint, {
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': "Token " + token
             },
             method: "POST",
             body: JSON.stringify({url: page.url, star: !page.star})
           }
      )
      .then(response => response.json())
  }
}
