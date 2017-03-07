import * as types from '../constants/ActionTypes';

function currentPageReducer(state = { url: "", categories: {}, star: false, title: "", created: "", visited: ""}, action){
  console.log("CURRENT PAGE REDUCER");
  switch(action.type){
    case types.RECEIVE_DECRYPTED:
      return {...state, s3_decrypted:action.html}
    case types.RECEIVE_POPUP_INFO:
      console.log("receive popup info - current page", action);
      var currentPage = action.page;
      var categoryObject = {};
      currentPage.categories.map(function(category) {
        categoryObject[category.pk] = category;
      })
      return {
        url: currentPage.url,
        categories: categoryObject,
        star: currentPage.star,
        title: currentPage.title
      }
    // case types.RECEIVE_PAGE_INFO:
    //   var categoryObject = {};
    //   action.categories.map(function(category) {
    //     categoryObject[category.pk] = category;
    //   })
    //   return {
    //     url: action.url,
    //     categories: categoryObject,
    //     star: action.star,
    //     title: action.title,
    //     created: action.created,
    //     visited: action.visited
    //   }
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
        return {
          title: action.page.title,
          url: action.page.url,
          star: action.page.star,
          categories: action.page.categories,
          created: action.page.created,
          visited: action.visited
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

// function currentPageReducer(state = { url: "", categories: [], star: false, title: ""}, action){
//   console.log("CURRENT PAGE REDUCER OUTER CHECK", action);
//   console.log("action", action.type, "types.", types.RECEIVE_PAGE_INFO, "IF they equal", action.type == types.RECEIVE_PAGE_INFO);
//   switch(action.type){
//     /* get decrypted page from s3 */
//     case types.RECEIVE_DECRYPTED:
//       return {...state, s3_decrypted:action.html}
//     case types.RECEIVE_PAGE_INFO:
//     case types.UPDATE_CURRENT_STAR:
//     case types.ADD_PAGE_CATEGORY:
//     case types.DELETE_PAGE_CATEGORY:
//     case types.RECEIVE_POPUP_INFO:
//     case types.SET_CURRENT_PAGE:
//       return Object.assign({}, pageInfo(state, action));
//     default:
//       console.log("default");
//       return state;
//   }
// }
export default currentPageReducer;
