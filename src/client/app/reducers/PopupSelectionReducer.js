import * as types from '../constants/ActionTypes';
import * as PopupConstants from '../constants/PopupConstants.js'

function popupSelectionReducer(state = {popupSelection: PopupConstants.POPUP_MENU_ITEMS[0].id}, action){

  switch(action.type){
    default:
        return state;
  }
}

export default popupSelectionReducer;
