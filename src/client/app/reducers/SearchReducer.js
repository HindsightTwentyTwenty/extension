import * as types from '../constants/ActionTypes';
import * as LookBackSections from '../constants/LookBackConstants.js'


function searchReducer(state = {results: [], dom: "", loading: true}, action){
  switch(action.type){
    case types.SEARCH_RESULTS:
      return { ...state, results:action.search_results, loading: false}
    case types.CLEAR_SEARCH_RESULTS:
      return { ...state, results:[], loading: true}
    default:
        return state;
  }
}

export default searchReducer;
