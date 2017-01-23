import * as types from '../constants/ActionTypes';

const searchCategory = (state, action) => {
  var stateMultiSelect = state.multiSelect;
  switch (action.type) {
    case types.TOGGLE_SEARCH_SELECTOR:
      // deselect all search categories except the most recently selected one
      return {multiSelect: !stateMultiSelect, searchCats: [state.searchCats[state.searchCats.length-1]]};
    case types.CLEAR_SEARCH_CATEGORIES:
      return {multiSelect: stateMultiSelect, searchCats: []};
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

function searchCategoryReducer(state = {multiSelect: false, searchCats: []}, action){
  return searchCategory(state, action);
}

export default searchCategoryReducer;
