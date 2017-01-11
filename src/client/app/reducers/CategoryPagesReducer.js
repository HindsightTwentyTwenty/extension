import * as types from '../constants/ActionTypes';

function categoryPagesReducer(state = [], action){
  switch(action.type){
    case types.RECEIVE_CATEGORIES_AND_PAGES:
      return action.categories;
    default:
      return state;
  }
}

export default categoryPagesReducer;
