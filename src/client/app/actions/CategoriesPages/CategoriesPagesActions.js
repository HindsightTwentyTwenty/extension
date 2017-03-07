import * as types from '../../constants/ActionTypes';
import * as urls from '../../constants/GlobalConstants';
import fetch from 'isomorphic-fetch'

const categoriesAndPagesEndpoint = urls.BASE_URL + "catsandpages/";
const editCategoryEndpoint = urls.BASE_URL + "editcategory/";
const deleteCategoryEndpoint = urls.BASE_URL + "deletecategory/";
const deletePageCategoryEndpoint = urls.BASE_URL + "deletecategorypage/";

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

// WC TODO: CHANGE BACKEND SO ZACH TAKES PK
export function removePageCategory(pagePk, categoryPk, token, pageUrl, categoryTitle){
  return dispatch => {
    dispatch({
      type: types.REMOVE_CAT_FROM_PAGE,
      categoryPk: categoryPk,
      pagePk: pagePk
    })
    return fetch(deletePageCategoryEndpoint, {
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': 'Token ' + token
             },
             method: "POST",
             body: JSON.stringify({url: pageUrl, category: categoryTitle})
           }
      )
      .then(response => response.json())
  }
}

// Change to send just pk, title, color to backend
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

// send only pk to backend
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
