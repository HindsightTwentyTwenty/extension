import * as types from '../constants/ActionTypes';

const searchCategory = (state, action) => {
  var stateMultiSelect = state.multiSelect;
  switch (action.type) {
    case types.TOGGLE_SEARCH_SELECTOR:
      state.multiSelect = !stateMultiSelect;
      return state;
    case types.CLEAR_SEARCH_CATEGORIES:
      return {multiSelect: stateMultiSelect, searchCats: []};
    case types.ADD_SEARCH_CATEGORY:
      return {multiSelect: stateMultiSelect, searchCats: state.searchCats.concat([action.categoryTitle])};
    case types.REMOVE_SEARCH_CATEGORY:
    // TODO: neater way to copy array and push on a single element, instead of pushing on all categories
      var newCategoryList = [];
      var currentCategories = state;
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
  switch(action.type){
    case types.TOGGLE_SEARCH_SELECTOR:
      return searchCategory(state, action);
    case types.CLEAR_SEARCH_CATEGORIES:
      return searchCategory(state, action);
    case types.ADD_SEARCH_CATEGORY:
      return searchCategory(state, action);
    case types.REMOVE_SEARCH_CATEGORY:
      return searchCategory(state, action);
    default:
        return state;
  }
}

export default searchCategoryReducer;
