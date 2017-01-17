import * as types from '../constants/ActionTypes';

function categoryPagesReducer(state = {cats: [], showStarred: false}, action){
  switch(action.type){
    case types.RECEIVE_CATEGORIES_AND_PAGES:
      return {cats: action.categories, showStarred: state.showStarred};
    case types.TOGGLE_SHOW_STARRED:
      return {cats: [...state.cats], showStarred: !state.showStarred};
    default:
      return state;
  }
}

export default categoryPagesReducer;
