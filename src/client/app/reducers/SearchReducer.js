import * as types from '../constants/ActionTypes';
import * as LookBackSections from '../constants/LookBackConstants.js'


function searchReducer(state = {results: []}, action){
  switch(action.type){
    case types.SEARCH_RESULTS:
      console.log("Search Reducer State:", state)
      console.log("Search Reducer Action.search_results:", action.search_results)
      return { ...state, results:action.search_results}

    // case types.SWITCH_LOOKBACK_SELECTION:
    //   if(action.lookBackSelection != LookBackSections.Search){
    //     return {...state, results:{}}
    //   } else {
    //     return state;
    //   }

    default:
        return state;
  }
}

export default searchReducer;
