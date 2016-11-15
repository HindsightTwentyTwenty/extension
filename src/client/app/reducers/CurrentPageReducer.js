import * as types from '../constants/ActionTypes';

const pageInfo = (state, action) => {
  switch (action.type) {
    case types.RECEIVE_PAGE_INFO:
      return {
        url: action.url,
        categories: action.categories,
        star: action.star,
        title: action.title
      }
    // TODO: change {star: !star} ?
    case types.UPDATE_CURRENT_STAR:
      return Object.assign({}, state, {star: action.star});
    case types.ADD_PAGE_CATEGORY:
      return Object.assign({}, state, {categories: state.categories.concat([action.category])});
    case types.DELETE_PAGE_CATEGORY:
    // TODO: neater way to copy arrya and push on a single element, instead of pushing on all categories
      var newCategoryList = [];
      var currentCategories = state.categories;
      for(var i = 0; i < currentCategories.length; i++) {
        if (currentCategories[i].title !== action.categoryTitle) {
          newCategoryList.push(currentCategories[i]);
        }
      }
      return Object.assign({}, state, {categories: newCategoryList});
    case types.SET_CURRENT_PAGE:
      if(action.save == false){
        return {
          url: "",
          categories: [],
          star: false,
          title: ""
        }
      }
      if(action.page.page.star == undefined){
        action.page.page.star = false;
      }
      return {
        title: action.page.page.title,
        url: action.page.page.url,
        star: action.page.page.star,
        categories: action.page.page.categories
      }
    default:
      return state
  }
}

function currentPageReducer(state = { url: "", categories: [], star: false, title: ""}, action){
  // TODO: simplify switch statement cause they're all the same :(
  switch(action.type){
    case types.RECEIVE_PAGE_INFO:
      return Object.assign({}, pageInfo(state, action));
    case types.UPDATE_CURRENT_STAR:
      return Object.assign({}, pageInfo(state, action));
    case types.ADD_PAGE_CATEGORY:
      return Object.assign({}, pageInfo(state, action));
    case types.DELETE_PAGE_CATEGORY:
      return Object.assign({}, pageInfo(state, action));
    case types.SET_CURRENT_PAGE:
      return Object.assign({}, pageInfo(state, action));
    default:
        return state;
  }
}

export default currentPageReducer;
