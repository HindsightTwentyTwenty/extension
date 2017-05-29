import * as types from '../constants/ActionTypes';
import * as PopupConstants from '../constants/PopupConstants.js'

function popupSelectionReducer(state = {cat_state: "select", box_state: 'tag'}, action){
  switch(action.type){
    case types.CHANGE_POPUP_CAT_STATE:
      return {...state, cat_state: action.cat_state};
    case types.CHANGE_POPUP_BOX_STATE:
      return {...state, box_state:action.box_state}
    default:
        return state;
  }
}

export default popupSelectionReducer;
