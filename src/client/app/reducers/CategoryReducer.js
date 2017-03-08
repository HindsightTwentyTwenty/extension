import * as types from '../constants/ActionTypes';
import * as GlobalConstants from '../constants/GlobalConstants';

function categoryReducer(state = {cats: {}, editCatColor: GlobalConstants.DEFAULT_CAT_COLOR,
      showColorPicker: false}, action){
  switch(action.type){
    case types.ADD_PAGE_CATEGORY:
      var newCatsList = Object.assign({}, state.cats);
      var newCat = action.categories[Object.keys(action.categories).length-1];
      newCatsList[newCat.pk] =  newCat;
      return {...state, cats: newCatsList};
    case types.SET_EDIT_CAT_COLOR:
      return {...state, editCatColor: action.color}
    case types.TOGGLE_COLOR_PICKER:
      return {...state, showColorPicker: action.showColorPicker}
    case types.UPDATE_CATEGORY:
      var newCategoryList = Object.assign({}, state.cats);
      var pk = action.pk;
      var title = action.title;
      var color = action.color;
      if(newCategoryList[pk]) {
          newCategoryList[pk].color = color;
          newCategoryList[pk].title = title;
      }
      return {...state, cats: newCategoryList};
    case types.DELETE_CATEGORY:
      var newCategoryList = Object.assign({}, state.cats);
      var pk = action.pk;
      if (newCategoryList[pk]) {
        delete newCategoryList[pk];
      }
      return {...state, cats: newCategoryList};
    case types.RECEIVE_CATEGORIES:
      var categoryObject = {};
      action.categories.map(function(category) {
        categoryObject[category.pk] = category;
      })
      return {...state, cats: categoryObject};
    case types.RECEIVE_PUSH_CATEGORY:
      var newCategoryList = Object.assign({}, state.cats);
      var newCategory = action.category_added;
      newCategoryList[newCategory.pk] = newCategory;
      return {...state, cats: newCategoryList};
    default:
      return state;
  }
}

export default categoryReducer;
