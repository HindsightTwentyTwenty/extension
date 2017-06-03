import * as types from '../../constants/ActionTypes';
import * as urls from '../../constants/GlobalConstants';
import fetch from 'isomorphic-fetch'

const addCategoryEndpoint = urls.BASE_URL + "addcategory/";
const categoriesAndPagesEndpoint = urls.BASE_URL + "getcategories/";
const allCategoriesEndpoint = urls.BASE_URL + "categories/";
const addPageCategoryEndpoint = urls.BASE_URL + "addcategorypage/";
const deletePageCategoryEndpoint = urls.BASE_URL + "deletecategorypage/";
const deleteCategoryEndpoint = urls.BASE_URL + "deletecategory/";
const editCategoryEndpoint = urls.BASE_URL + "editcategory/";

export function pushCategory(category, color, token){
  return dispatch => {
    return fetch(addCategoryEndpoint, {
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': 'Token ' + token
             },
             method: "POST",
             body: JSON.stringify({category: category, color: color})
           }
      )
      .then(response => response.json())
      .then(json => dispatch({
        type: types.RECEIVE_PUSH_CATEGORY,
        category_added: json
      })
    )
  }
}

export function fetchCategories(token){
  return dispatch => {
    return fetch(allCategoriesEndpoint,{
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': 'Token ' + token
       },
       method: "GET"
    })
      .then(response => response.json())
      .then(json => dispatch({
        type: types.RECEIVE_CATEGORIES,
        categories: json
      }))
  }
}

export function fetchCategoriesAndPages(token){
  return dispatch => {
    return fetch(categoriesAndPagesEndpoint, {
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': 'Token ' + token
       },
       method: "GET"
    })
      .then(response => response.json())
      .then(json => dispatch({
        type: types.RECEIVE_CATEGORIES_AND_PAGES,
        json: json
      }))
  }
}

// export function moveCategoryToFront(cat){
//   console.log("MOVE_CAT_TO_TOP");
//   return dispatch => {
//     dispatch({
//       type: types.MOVE_CAT_TO_TOP,
//       cat: cat
//     })
//   }
// }

export function toggleCategory(pageUrl, category, addOrDelete, token, pageTitle){
  console.log("toggleCategory", category, pageTitle);
  var dispatchType = addOrDelete ? types.ADD_PAGE_CATEGORY : types.DELETE_PAGE_CATEGORY;
  return dispatch => {
    var endpoint = addOrDelete ? addPageCategoryEndpoint : deletePageCategoryEndpoint;
    return fetch(endpoint, {
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': 'Token ' + token
             },
             method: "POST",
             body: JSON.stringify({url: pageUrl, category: category.title, title: pageTitle})
           }
      )
      .then(response => response.json())
      .then(json => dispatch({
        type: types.REMOVE_CAT_FROM_PAGE,
        json: json,
        categoryTitle: category.title
      }))
      .then(
        dispatch({
          type: dispatchType,
          category: category
        })
      )
  }
}

//TODO: WC talked with GM about receiving confirmation from backend before deleting from frontend
export function deleteCategory(pk, title, token) {
  return dispatch => {
    dispatch({
      type: types.DELETE_CATEGORY,
      pk: pk
    })
    return fetch(deleteCategoryEndpoint, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token
      },
      method: "POST",
      body: JSON.stringify({category: title})
    })
  }
}

export function editCategory(pk, oldTitle, updatedTitle, updatedColor, token) {
  return dispatch => {
    dispatch({
      type: types.UPDATE_CATEGORY,
      pk: pk,
      title: updatedTitle,
      color: updatedColor
    })
    return fetch(editCategoryEndpoint, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token
      },
      method: "POST",
      body: JSON.stringify({old: oldTitle, updated: updatedTitle, color: updatedColor})
    })
  }
}

export function toggleColorPicker(show) {
  return dispatch => {
    dispatch({
      type: types.TOGGLE_COLOR_PICKER,
      showColorPicker: show
    })
  }
}

export function clearSearchCategories() {
  return dispatch => {
    dispatch({
      type: types.CLEAR_SEARCH_CATEGORIES
    })
  }
}

export function updateSearchCategories(newSearchCategories) {
  return dispatch => {
    dispatch({
      type: types.UPDATE_SEARCH_CATEGORIES,
      newSearchCategories: newSearchCategories,
    })
  }
}

export function updateSearchCategory(url, categoryInfo, checked) {
  return dispatch => {
    dispatch({
      type: types.UPDATE_SEARCH_CATEGORY,
      title: categoryInfo.title,
      checked: checked
    })
  }
}

export function toggleShowStarred() {
  return dispatch => {
    dispatch({
      type: types.TOGGLE_SHOW_STARRED
    })
  }
}

export function setEditCatColor(color) {
  return dispatch => {
    dispatch({
      type: types.SET_EDIT_CAT_COLOR,
      color: color
    })
  }
}
