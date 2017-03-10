import * as types from '../constants/ActionTypes';
import * as PopupConstants from '../constants/PopupConstants.js'

function popupNavReducer(state = PopupConstants.Loading, action){
  switch(action.type){
    case types.RECEIVE_TRACKING_OFF_POPUP_INFO:
      // Used in regular popup flow when tracking is off
      return PopupConstants.Received
    case types.RECEIVE_POPUP_INFO:
      // Used in regular Popup flow
      return PopupConstants.Received
    case types.RECEIVE_PAGE_INFO:
      // Used after receving page during login flow
      return PopupConstants.Received
    case types.POPUP_STATUS:
      return action.popup_status
    default:
      return state;
  }

}

export default popupNavReducer;
