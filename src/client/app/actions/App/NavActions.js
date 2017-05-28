import * as types from '../../constants/ActionTypes';
import * as LookBackSections from '../../constants/LookBackConstants.js';
import * as LookbackActions from '../App/LookbackActions.js';

export function switchMenuSelection(newMenuSelection, search_term) {
  return dispatch => {
    return [
      dispatch(LookbackActions.clearSearchResults()),
      dispatch({
        type: types.SWITCH_MENU_SELECTION,
        menuSelection: newMenuSelection,
        searchTerm: search_term
      })
    ]
  }
}

export function switchCategoryView(newView){
  return dispatch => {
    dispatch({
      type: types.SWITCH_CATEGORY_VIEW,
      newView: newView
    })
  }
}
