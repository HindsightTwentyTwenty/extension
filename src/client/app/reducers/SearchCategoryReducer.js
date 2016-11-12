import * as types from '../constants/ActionTypes';

const searchCategory = (state, action) => {
  switch (action.type) {
    case types.ADD_SEARCH_CATEGORY:
      return state.concat([action.categoryTitle]);
    case types.REMOVE_SEARCH_CATEGORY:
    // TODO: neater way to copy array and push on a single element, instead of pushing on all categories
      var newCategoryList = [];
      var currentCategories = state;
      for(var i = 0; i < currentCategories.length; i++) {
        if (currentCategories[i] !== action.categoryTitle) {
          newCategoryList.push(currentCategories[i]);
        }
      }
      return newCategoryList;
    default:
      return state
  }
}

function searchCategoryReducer(state = [], action){
  switch(action.type){
    case types.ADD_SEARCH_CATEGORY:
      return searchCategory(state, action);
    case types.REMOVE_SEARCH_CATEGORY:
      return searchCategory(state, action);
    default:
        return state;
  }
}

export default searchCategoryReducer;
