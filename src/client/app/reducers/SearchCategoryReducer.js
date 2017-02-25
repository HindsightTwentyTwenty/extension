import * as types from '../constants/ActionTypes';

const searchCategory = (state, action) => {
  switch (action.type) {
    case types.CLEAR_SEARCH_CATEGORIES:
      return {searchCats: []};
    case types.ADD_SEARCH_CATEGORY:
      return {searchCats: state.searchCats.concat([action.categoryTitle])};
    case types.REMOVE_SEARCH_CATEGORY:
      var newCategoryList = [];
      var currentCategories = state.searchCats;
      for(var i = 0; i < currentCategories.length; i++) {
        if (currentCategories[i] !== action.categoryTitle) {
          newCategoryList.push(currentCategories[i]);
        }
      }
      return {searchCats: newCategoryList};
    default:
      return state
  }
}

function searchCategoryReducer(state = {searchCats: []}, action){
  return searchCategory(state, action);
}

export default searchCategoryReducer;
