import * as types from '../constants/ActionTypes';

function categoryReducer(state = {cats: [], editCategory: '', newCategoryName: ''}, action){
  switch(action.type){
    case types.UPDATE_CATEGORY_EDIT_FIELD:
      return {...state, newCategoryName: action.categoryTitle}
    case types.TOGGLE_EDIT_CATEGORY:
      return {...state, editCategory: action.editCategory}
    case types.UPDATE_CATEGORY_TITLE:
      var newCategoryList = [];
      var currentCategories = state.cats;
      for(var i = 0; i < currentCategories.length; i++) {
        if (currentCategories[i].title === action.old) {
          currentCategories[i].title = action.updated;
        }
        newCategoryList.push(currentCategories[i]);
      }
      return {...state, cats: newCategoryList};
    case types.DELETE_CATEGORY:
      var newCategoryList = [];
      var currentCategories = state.cats;
      for(var i = 0; i < currentCategories.length; i++) {
        if (currentCategories[i].title !== action.categoryTitle) {
          newCategoryList.push(currentCategories[i]);
        }
      }
      return {...state, cats: newCategoryList};
    case types.RECEIVE_CATEGORIES:
      return {...state, cats: action.categories};
    case types.RECEIVE_PUSH_CATEGORY:
      return {...state, cats: [...state.cats, action.category_added]};
    default:
        return state;
  }
}

export default categoryReducer;
