import * as types from '../constants/ActionTypes';
import * as LookBackSections from '../constants/LookBackConstants.js'

function lookBackNavReducer(state = 0, action){
  switch(action.type){
    case types.SWITCH_LOOKBACK_SELECTION:

      // Handle Selected Highlighting in the Navbar
      if(state != LookBackSections.Search){
        document.getElementById("nav-bar-button-" + state).classList.remove('nav-bar-button-selected');
      }
      console.log("action.lookbackSelection", action.lookBackSelection);
      console.log("Search", LookBackSections.Search);
      if(action.lookBackSelection != LookBackSections.Search){
        document.getElementById("nav-bar-button-" + action.lookBackSelection).classList.add('nav-bar-button-selected');
      }

      return action.lookBackSelection;
    default:
        return state;
  }
}

export default lookBackNavReducer;
