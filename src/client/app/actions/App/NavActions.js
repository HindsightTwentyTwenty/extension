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

export function setEditCat(editCatPK){
  return dispatch => {
    dispatch({
      type: types.SET_EDIT_CAT,
      editCatPK: editCatPK
    })
  }
}

export function changeModalView(newView){
  return dispatch => {
    dispatch({
      type: types.CHANGE_MODAL_VIEW,
      newView: newView
    })
  }
}

export function toggleDetailView(){
  return dispatch => {
    dispatch({
      type: types.TOGGLE_DETAIL_VIEW,
    })
  }
}

export function setResultView(view){
  return dispatch => {
    dispatch({
      type: types.SET_RESULT_VIEW,
      view: view
    })
  }
}

export function setDetailPage(page){
  return dispatch => {
    dispatch({
      type: types.SET_DETAIL_PAGE,
      page: page
    })
  }
}
