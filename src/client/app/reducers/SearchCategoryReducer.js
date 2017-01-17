import * as types from '../constants/ActionTypes';

const searchCategory = (state, action) => {
  var stateMultiSelect = state.multiSelect;
  switch (action.type) {
    case types.TOGGLE_SEARCH_SELECTOR:
      return {multiSelect: !stateMultiSelect, searchCats: [...state.searchCats]};
    case types.CLEAR_SEARCH_CATEGORIES:
      return {multiSelect: stateMultiSelect, searchCats: ["starred"]};
    case types.ADD_SEARCH_CATEGORY:
      return {multiSelect: stateMultiSelect, searchCats: state.searchCats.concat([action.categoryTitle])};
    case types.REMOVE_SEARCH_CATEGORY:
      var newCategoryList = [];
      var currentCategories = state.searchCats;
      for(var i = 0; i < currentCategories.length; i++) {
        if (currentCategories[i] !== action.categoryTitle) {
          newCategoryList.push(currentCategories[i]);
        }
      }
      return {multiSelect: stateMultiSelect, searchCats: newCategoryList};
    default:
      return state
  }
}

function searchCategoryReducer(state = {multiSelect: false, searchCats: ["starred"]}, action){
  return searchCategory(state, action);
}

export default searchCategoryReducer;
