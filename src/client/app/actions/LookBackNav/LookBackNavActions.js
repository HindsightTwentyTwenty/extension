import * as types from '../../constants/ActionTypes';
import * as LookBackSections from '../../constants/LookBackConstants.js';
import * as LookbackActions from '../App/LookbackActions.js';

export function switchLookBackSelection(newLookBackSelection, search_term) {
  return dispatch => {
    return [
      dispatch(LookbackActions.clearSearchResults()),
      dispatch({
        type: types.SWITCH_LOOKBACK_SELECTION,
        lookBackSelection: newLookBackSelection,
        searchTerm: search_term
      })
    ]
  }
}
