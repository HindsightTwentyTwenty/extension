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
      console.log("UPDATE_CATEGORY");
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
      console.log("RECEIVE_CATEGORIES", action.categories);
      var categoryObject = {};
      action.categories.map(function(category) {
        categoryObject[category.pk] = category;
      })
      return {...state, cats: categoryObject};
    case types.RECEIVE_PUSH_CATEGORY:
      console.log("receive push category");
      var newCategoryList = Object.assign({}, state.cats);
      var newCategory = action.category_added;
      newCategoryList[newCategory.pk] = newCategory;
      return {...state, cats: newCategoryList};
    case types.RECEIVE_TRACKING_OFF_POPUP_INFO:
    case types.RECEIVE_POPUP_INFO:
      console.log("in cat reducer, receive popup info", action);
      var categoryObject = [];
      for (var cat in action.categories){
        categoryObject.push(action.categories[cat])
      }
      console.log("still in cat reducer, returned object", categoryObject)
      return {...state, cats: categoryObject};
    default:
      return state;
  }
}

export default categoryReducer;
