import * as types from '../../constants/ActionTypes';
import * as urls from '../../constants/GlobalConstants';
import fetch from 'isomorphic-fetch'

const categoriesAndPagesEndpoint = urls.BASE_URL + "getcategories/";
const allCategoriesEndpoint = urls.BASE_URL + "categories/";
const addPageCategoryEndpoint = urls.BASE_URL + "addcategorypage/";
const deletePageCategoryEndpoint = urls.BASE_URL + "deletecategorypage/";
const deleteCategoryEndpoint = urls.BASE_URL + "deletecategory/";
const editCategoryEndpoint = urls.BASE_URL + "editcategory/";

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

export function deletePageCategory(url, categoryTitle, token){
  return dispatch => {
    return fetch(deletePageCategoryEndpoint, {
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': 'Token ' + token
             },
             method: "POST",
             body: JSON.stringify({url:url, category: categoryTitle})
           }
      )
      .then(response => response.json())
      .then(json => dispatch({
          type: types.DELETE_PAGE_CATEGORY,
          categoryTitle: categoryTitle
      }))
      .then(json => dispatch({
        type: types.REMOVE_CAT_FROM_PAGE,
        json: json,
        categoryTitle: categoryTitle
      }))
  }
}

export function addPageCategory(url, categoryTitle, token, color){
  return dispatch => {
    return fetch(addPageCategoryEndpoint, {
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': 'Token ' + token
             },
             method: "POST",
             body: JSON.stringify({url: url, category: categoryTitle})
           }
      )
      .then(response => response.json())
      .then(json => dispatch({
          type: types.ADD_PAGE_CATEGORY,
          categories: json.categories
      }))
  }
}

export function toggleCategory(pageUrl, category, addOrDelete, token, color){
  if(addOrDelete){
    return dispatch => {
      dispatch(addPageCategory(pageUrl, category, token, color))
    }
  }else{
    return dispatch => {
      dispatch(deletePageCategory(pageUrl, category, token))
    }
  }
}

//TODO: WC talked with GM about receiving confirmation from backend before deleting from frontend
export function deleteCategory(title, token) {
  return dispatch => {
    dispatch({
      type: types.DELETE_CATEGORY,
      categoryTitle: title
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

export function editCategory(oldTitle, updatedTitle, updatedColor, token) {
  return dispatch => {
    dispatch({
      type: types.UPDATE_CATEGORY,
      old: oldTitle,
      updated: updatedTitle,
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

export function toggleEditCategory(categoryTitle) {
  return dispatch => {
    dispatch({
      type: types.TOGGLE_EDIT_CATEGORY,
      editCategory: categoryTitle
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

export function updateSearchCategory(categoryTitle, addOrDelete) {
  var dispatchType = addOrDelete ? types.ADD_SEARCH_CATEGORY : types.REMOVE_SEARCH_CATEGORY;
  return dispatch => {
    dispatch({
      type: dispatchType,
      categoryTitle: categoryTitle,
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

export function toggleDeleteCategory(category) {
  return dispatch => {
    dispatch({
      type: types.CONFIRM_DELETE,
      categoryTitle: category
    })
  }
}
