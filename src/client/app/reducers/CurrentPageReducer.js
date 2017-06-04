import * as types from '../constants/ActionTypes';
import * as LookBackConstants from '../constants/LookBackConstants';

function currentPageReducer(state = { url: "", categories: {}, star: false, title: "", created: "", visited: "", note:""}, action){
  switch(action.type){
    case types.RECEIVE_DECRYPTED:
      return {...state, s3_decrypted: action.html}
    case types.RECEIVE_TRACKING_OFF_POPUP_INFO:
      return { ...state, url: action.url, categories: {}, start: false, title: action.title, created: "", visited: "" }
    case types.RECEIVE_POPUP_INFO:
      console.log("RECEIVE_POPUP_INFO", action.page);
      // Used in regular popup flow
      var currentPage = action.page;
      var categoryObject = {};
      console.log("cats on RECEIVE", currentPage.categories);
      currentPage.categories.map(function(category) {
        categoryObject[category.pk] = category;
      })
      return {
        url: currentPage.url,
        categories: categoryObject,
        star: currentPage.star,
        title: currentPage.title,
        favIconUrl:action.favicon,
        note: currentPage.note
      }
    case types.RECEIVE_UPDATED_NOTE:
      return{...state, note:action.note}
    case types.RECEIVE_PAGE_INFO:
      // Used on login to get page info
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
      newCategoryList[action.category.pk] = action.category;
      return {...state, categories: newCategoryList};
    case types.DELETE_PAGE_CATEGORY:
      var newCategoryList = Object.assign({}, state.categories);
      var pk = action.category.pk;
      if (newCategoryList[pk]) {
        delete newCategoryList[pk];
      }
      return {...state, categories: newCategoryList};
    case types.SET_CURRENT_PAGE:
      if(action.page.url != null){
        if(action.page.star == undefined){
          action.page.star = false;
        }
        var categoryObject = {};
        if(Object.keys(action.page.categories).length > 0){
          for(var category in action.page.categories){
            var curr = action.page.categories[category];
            categoryObject[curr.pk] = curr;
          }
        }
        return {
          title: action.page.title,
          url: action.page.url,
          star: action.page.star,
          categories: categoryObject,
          created: action.page.created,
          visited: action.visited,
          preview: action.preview,
          note: action.note
        }
      }
      if(action.page.star == undefined){
        action.page.star = false;
      }
      return {
        title: "",
        url: "",
        star: action.page.star,
        categories: {},
        created: "",
        visited: "",
        preview: LookBackConstants.DEFAULT_IMG
      }
    default:
      return state
  }
}
export default currentPageReducer;
