import * as types from '../constants/ActionTypes';
import * as GlobalConstants from '../constants/GlobalConstants';

function categoryReducer(state = {cats: {}, editCatColor: GlobalConstants.DEFAULT_CAT_COLOR,
      showColorPicker: false}, action){
  switch(action.type){
    case types.SET_EDIT_CAT_COLOR:
      return {...state, editCatColor: action.color}
    case types.TOGGLE_COLOR_PICKER:
      return {...state, showColorPicker: action.showColorPicker}
    case types.UPDATE_CATEGORY:
      var newCategoryList = Object.assign({}, state.cats);
      var oldCatTitle = action.old;
      var updatedCatTitle = action.updated;
      var updatedColor = action.color;
      if(newCategoryList[oldCatTitle]) {
          newCategoryList[oldCatTitle].color = updatedColor;
      }
      if (newCategoryList[oldCatTitle] && updatedCatTitle != oldCatTitle) {
        newCategoryList[updatedCatTitle] = newCategoryList[oldCatTitle];
        delete newCategoryList[oldCatTitle];
      }
      return {...state, cats: newCategoryList};
    case types.DELETE_CATEGORY:
      var newCategoryList = Object.assign({}, state.cats);
      var deleteCat = action.categoryTitle;
      if (newCategoryList[deleteCat]) {
        delete newCategoryList[deleteCat];
      }
      return {...state, cats: newCategoryList};
    case types.RECEIVE_CATEGORIES:
      var categoryObject = {};
      action.categories.map(function(category) {
        categoryObject[category.title] = category;
      })
      return {...state, cats: categoryObject};
    case types.RECEIVE_PUSH_CATEGORY:
      var newCategoryList = Object.assign({}, state.cats);
      var newCategory = action.category_added;
      newCategoryList[newCategory.title] = newCategory;
      return {...state, cats: newCategoryList};
    default:
      return state;
  }
}

export default categoryReducer;
