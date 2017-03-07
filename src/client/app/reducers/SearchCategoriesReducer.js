import * as types from '../constants/ActionTypes';

function searchCategoriesReducer(state = {categories: new Set(), showStarred: false}, action){
  switch (action.type) {
    case types.TOGGLE_SHOW_STARRED:
      return {...state, showStarred: !state.showStarred};
    case types.CLEAR_SEARCH_CATEGORIES:
      return {...state, categories: new Set()};
    case types.ADD_SEARCH_CATEGORY:
      var categories = new Set(state.categories);
      categories.add(action.categoryPk);
      return {...state, categories: categories};
    case types.REMOVE_SEARCH_CATEGORY:
      var categories = new Set(state.categories);
      if (categories.has(action.categoryPk)) {
        categories.delete(action.categoryPk);
      }
      return {...state, categories: categories};
    default:
      return state
  }
}

export default searchCategoriesReducer;
