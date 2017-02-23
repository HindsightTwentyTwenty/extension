import * as types from '../constants/ActionTypes';
import * as LookBackSections from '../constants/LookBackConstants.js'


function searchReducer(state = {results: [], dom: "", loading: true}, action){
  switch(action.type){
    case types.SEARCH_RESULTS:
      console.log("recevied search results");
      return { ...state, results:action.search_results, loading: false}
    case types.CLEAR_SEARCH_RESULTS:
      return { ...state, results:[], loading: true}
    case types.SET_CURR_DOM:
      return {...state, dom:action.dom}
    default:
        return state;
  }
}

export default searchReducer;
