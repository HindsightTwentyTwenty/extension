import * as types from '../constants/ActionTypes';
import * as LookBackSections from '../constants/LookBackConstants.js'


function searchReducer(state = {results: [], dom: ""}, action){
  switch(action.type){
    case types.SEARCH_RESULTS:
      return { ...state, results:action.search_results}
    case types.SET_CURR_DOM:
      console.log("SETTING DOM");
      return {...state, dom:action.dom}
    default:
        return state;
  }
}

export default searchReducer;
