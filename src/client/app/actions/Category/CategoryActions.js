import * as types from '../../constants/ActionTypes';
import * as urls from '../../constants/GlobalConstants';
import fetch from 'isomorphic-fetch'

const categoriesAndPagesEndpoint = urls.BASE_URL + "getcategories/";
const allCategoriesEndpoint = urls.BASE_URL + "categories/";
const addPageCategoryEndpoint = urls.BASE_URL + "addcategorypage/";
const deletePageCategoryEndpoint = urls.BASE_URL + "deletecategorypage/";
const deleteCategoryEndpoint = urls.BASE_URL + "deletecategory/";

export function fetchCategories(token){
  console.log("Token " + token);
  return dispatch => {
    dispatch({
      type: types.REQUEST_CATEGORIES
    })
    return fetch(allCategoriesEndpoint,{
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': "Token " + token
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
    dispatch({
      type: types.REQUEST_CATEGORIES_AND_PAGES
    })
    return fetch(categoriesAndPagesEndpoint, {
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': "Token " + token
       },
       method: "GET"
    })
      .then(response => response.json())
      .then(json => dispatch({
        type: types.RECEIVE_CATEGORIES_AND_PAGES,
        categories: json
      }))
  }
}

export function toggleCategory(pageUrl, category, addOrDelete, token){
  var dispatchType = addOrDelete ? types.ADD_PAGE_CATEGORY : types.DELETE_PAGE_CATEGORY;
  return dispatch => {
    dispatch({
      type: dispatchType,
      category: category
    })
    var endpoint = addOrDelete ? addPageCategoryEndpoint : deletePageCategoryEndpoint;
    return fetch(endpoint, {
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': "Token " + token
             },
             method: "POST",
             body: JSON.stringify({url: pageUrl, category: category.title})
           }
      )
      .then(response => response.json())
  }
}

export function clearSearchCategories() {
  return dispatch => {
    dispatch({
      type: types.CLEAR_SEARCH_CATEGORIES
    })
  }
}

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
    }
  )}
}

export function toggleSearchSelector() {
  return dispatch => {
    dispatch({
      type: types.TOGGLE_SEARCH_SELECTOR
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
