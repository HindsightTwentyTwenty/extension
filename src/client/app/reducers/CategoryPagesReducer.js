import * as types from '../constants/ActionTypes';

function categoryPagesReducer(state = {catsPages: [], starred:[], showStarred: false}, action){
  switch(action.type){
    case types.RECEIVE_CATEGORIES_AND_PAGES:
      return {catsPages: action.categories.categories, starred: action.categories.starred, showStarred: state.showStarred};
    case types.TOGGLE_SHOW_STARRED:
      return {catsPages: [...state.catsPages], starred: [...state.starred], showStarred: !state.showStarred};
    default:
      return state;
  }
}

export default categoryPagesReducer;
