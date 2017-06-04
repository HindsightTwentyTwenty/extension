import * as types from '../constants/ActionTypes';
import * as LookBackSections from '../constants/LookBackConstants.js'

function NavReducer(state = {selection: 0, searchTerm: "", categoriesView: "select", editCatPK: 0, modalView: "info", showDetails: false, resultView: ""}, action){
  switch(action.type){
    case types.SWITCH_MENU_SELECTION:
      // Handle Selected Highlighting in the Navbar
      if(state.menuSelection != LookBackSections.Search){
        document.getElementById("nav-bar-button-" + state.menuSelection).classList.remove('nav-bar-button-selected');
      }
      if(action.menuSelection != LookBackSections.Search){
        document.getElementById("nav-bar-button-" + action.menuSelection).classList.add('nav-bar-button-selected');
      }
      return {...state, menuSelection: action.menuSelection, searchTerm: action.searchTerm}
    case types.SWITCH_CATEGORY_VIEW:
      return {...state, categoriesView: action.newView}
    case types.SET_EDIT_CAT:
      return {...state, editCatPK: action.editCatPK}
    case types.CHANGE_MODAL_VIEW:
      return {...state, modalView: action.newView}
    case types.TOGGLE_DETAIL_VIEW:
      return {...state, showDetails: !state.showDetails}
    case types.SET_RESULT_VIEW:
      return {...state, resultView: action.view}
    default:
        return state;
  }
}

export default NavReducer;
