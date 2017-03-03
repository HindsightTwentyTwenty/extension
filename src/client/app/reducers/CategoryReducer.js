import * as types from '../constants/ActionTypes';
import * as GlobalConstants from '../constants/GlobalConstants';

function categoryReducer(state = {cats: [], editCatColor: GlobalConstants.DEFAULT_CAT_COLOR,
      showColorPicker: false, confirmDelete: '', editCategory: ''}, action){
  switch(action.type){
    case types.CONFIRM_DELETE:
      return {...state, confirmDelete: action.categoryTitle}
    case types.SET_EDIT_CAT_COLOR:
      return {...state, editCatColor: action.color}
    case types.TOGGLE_COLOR_PICKER:
      return {...state, showColorPicker: action.showColorPicker}
    case types.TOGGLE_EDIT_CATEGORY:
      return {...state, editCategory: action.editCategory}
    case types.UPDATE_CATEGORY:
      var newCategoryList = [];
      var currentCategories = state.cats;
      for(var i = 0; i < currentCategories.length; i++) {
        if (currentCategories[i].title === action.old) {
          currentCategories[i].title = action.updated;
          currentCategories[i].color = action.color; 
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
