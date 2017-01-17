import * as types from '../../constants/ActionTypes';
import * as urls from '../../constants/GlobalConstants';
import fetch from 'isomorphic-fetch'

export function toggleShowStarred() {
  return dispatch => {
    dispatch({
      type: types.TOGGLE_SHOW_STARRED
    })
  }
}
