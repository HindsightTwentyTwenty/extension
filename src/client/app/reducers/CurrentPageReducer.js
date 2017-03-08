import * as types from '../constants/ActionTypes';

function currentPageReducer(state = { url: "", categories: {}, star: false, title: "", created: "", visited: ""}, action){
  switch(action.type){
    case types.RECEIVE_DECRYPTED:
      return {...state, s3_decrypted:action.html}
    case types.RECEIVE_PAGE_INFO:
      var categoryObject = {};
      action.categories.map(function(category) {
        categoryObject[category.pk] = category;
      })
      return {
        url: action.url,
        categories: categoryObject,
        star: action.star,
        title: action.title,
        created: action.created,
        visited: action.visited
      }
    case types.UPDATE_CURRENT_STAR: //WC TODO: USE TOGGLE STAR INSTEAD???
      return {...state, star: !state.star};
    case types.ADD_PAGE_CATEGORY:
      var newCategoryList = Object.assign({}, state.categories);
      for(var key in action.categories) {
        if (action.categories[key].title === action.categoryTitle) {
          newCategoryList[action.categories[key].pk] =  action.categories[key];
          break;
        }
      }
      return {...state, categories: newCategoryList};
    case types.DELETE_PAGE_CATEGORY:
      var newCategoryList = Object.assign({}, state.categories);
      for(var key in newCategoryList) {
        if (newCategoryList[key].title === action.categoryTitle) {
          delete newCategoryList[key];
          break;
        }
      }
      return {...state, categories: newCategoryList};
    case types.SET_CURRENT_PAGE:
      if(action.page.url != null){
        if(action.page.star == undefined){
          action.page.star = false;
        }
        var categoryObject = {};
        action.page.categories.map(function(category) {
          categoryObject[category.pk] = category;
        });
        return {
          title: action.page.title,
          url: action.page.url,
          star: action.page.star,
          categories: categoryObject,
          created: action.page.created,
          visited: action.visited
        }
      }else{
        if(action.page.star == undefined){
          action.page.star = false;
        }
        return {
          title: "",
          url: "",
          star: action.page.star,
          categories: [],
          created: "",
          visited: ""
        }
      }
    default:
      return state
  }
}
export default currentPageReducer;
