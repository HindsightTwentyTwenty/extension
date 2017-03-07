import * as types from '../constants/ActionTypes';
import * as PopupConstants from '../constants/PopupConstants.js'

function popupNavReducer(state = PopupConstants.Loading, action){
  switch(action.type){
    case types.RECEIVE_POPUP_INFO:
      console.log("receive popup info found in reducer");
      return PopupConstants.Received
    case types.POPUP_STATUS:
      return action.popup_status
    default:
      return state;
  }

}

export default popupNavReducer;
