import * as types from '../constants/ActionTypes';

const category = (state, action) => {
  switch (action.type) {
    case types.RECEIVE_PUSH_CATEGORY:
      return {
        title: action.category_added.title
      }
    default:
      return state
  }
}

function categoryReducer(state = {cats: [], editCategory: '', newCategoryName: ''}, action){
  switch(action.type){
    case types.UPDATE_CATEGORY_EDIT_FIELD:
      return {cats: [...state.cats], editCategory: state.editCategory, newCategoryName: action.categoryTitle}
    case types.TOGGLE_EDIT_CATEGORY:
      return {cats: [...state.cats], editCategory: action.editCategory, newCategoryName: state.newCategoryName}
    case types.UPDATE_CATEGORY_TITLE:
      var newCategoryList = [];
      var currentCategories = state.cats;
      for(var i = 0; i < currentCategories.length; i++) {
        if (currentCategories[i].title === action.old) {
          currentCategories[i].title = action.updated;
        }
        newCategoryList.push(currentCategories[i]);
      }
      return {cats: newCategoryList, editCategory: state.editCategory, newCategoryName: state.newCategoryName};
    case types.DELETE_CATEGORY:
      var newCategoryList = [];
      var currentCategories = state.cats;
      for(var i = 0; i < currentCategories.length; i++) {
        if (currentCategories[i].title !== action.categoryTitle) {
          newCategoryList.push(currentCategories[i]);
        }
      }
      return {cats: newCategoryList, editCategory: state.editCategory, newCategoryName: state.newCategoryName};
    case types.RECEIVE_CATEGORIES:
      return {cats: action.categories, editCategory: state.editCategory, newCategoryName: state.newCategoryName};
    case types.REQUEST_CATEGORIES:
    //TODO: Remove empty object source??
      return {cats: [...state.cats], editCategory: state.editCategory, newCategoryName: state.newCategoryName};
    case types.RECEIVE_PUSH_CATEGORY:
      return {cats: [...state.cats, category(undefined, action)], editCategory: state.editCategory, newCategoryName: state.newCategoryName};
    default:
        return state;
  }
}

export default categoryReducer;
