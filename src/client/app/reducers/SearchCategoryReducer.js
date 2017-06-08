import * as types from '../constants/ActionTypes';

const searchCategory = (state, action) => {
  switch (action.type) {
    case types.CLEAR_SEARCH_CATEGORIES:
      var catSet = new Set();
      return {searchCats: catSet};
    case types.UPDATE_SEARCH_CATEGORIES:
      var catSet = new Set();
      action.newSearchCategories.forEach(function(cat){catSet.add(cat.value)});
      return {searchCats: catSet};
    case types.UPDATE_SEARCH_CATEGORY:
      var catSet = new Set(state.searchCats);
      if(action.checked){
        catSet.add(action.title);
      }else{
        catSet.delete(action.title);
      }
      return {searchCats: catSet}
    default:
      return state
  }
}

function searchCategoryReducer(state = {searchCats: new Set()}, action){
  return searchCategory(state, action);
}

export default searchCategoryReducer;
