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
    case types.UPDATE_CURRENT_STAR:
      return Object.assign({}, state, {star: !state.star});
    case types.ADD_PAGE_CATEGORY:
      return Object.assign({}, state, {categories: state.categories.concat([action.category])});
    case types.DELETE_PAGE_CATEGORY:
    // TODO: neater way to copy array and push on a single element, instead of pushing on all categories
      var newCategoryList = [];
      var currentCategories = state.categories;
      for(var i = 0; i < currentCategories.length; i++) {
        if (currentCategories[i].title !== action.category.title) {
          newCategoryList.push(currentCategories[i]);
        }
      }
      return Object.assign({}, state, {categories: newCategoryList});
    case types.SET_CURRENT_PAGE:
      if(action.page.url == null){
        return {
          url: "",
          categories: [],
          star: false,
          title: ""
        }
      }
      if(action.page.star == undefined){
        action.page.star = false;
      }
      return {
        title: action.page.title,
        url: action.page.url,
        star: action.page.star,
        categories: action.page.categories,
        created: action.page.created,
        visited: action.visited
      }
    default:
      return state
  }
}

function currentPageReducer(state = { url: "", categories: [], star: false, title: ""}, action){
  switch(action.type){
    case types.RECEIVE_PAGE_INFO:
    case types.UPDATE_CURRENT_STAR:
    case types.ADD_PAGE_CATEGORY:
    case types.DELETE_PAGE_CATEGORY:
    case types.SET_CURRENT_PAGE:
      return Object.assign({}, pageInfo(state, action));
    default:
        return state;
  }
}

export default currentPageReducer;
