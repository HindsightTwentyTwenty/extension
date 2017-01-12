import * as types from '../../constants/ActionTypes';
import * as urls from '../../constants/GlobalConstants';
import fetch from 'isomorphic-fetch'

const categoriesAndPagesEndpoint = urls.BASE_URL + "getcategories/";
const allCategoriesEndpoint = urls.BASE_URL + "categories/";
const addPageCategoryEndpoint = urls.BASE_URL + "addcategorypage/";
const deletePageCategoryEndpoint = urls.BASE_URL + "deletecategorypage/";
const deleteCategoryEndpoint = urls.BASE_URL + "deletecategory/";

export function updatePageCategory(category, addOrDelete) {
  if (addOrDelete) {
    return {
      type: types.ADD_PAGE_CATEGORY,
      category: category,
    }
  } else {
    return {
      type: types.DELETE_PAGE_CATEGORY,
      categoryTitle: category.title
    }
  }
}

export function updateSearchCategory(categoryTitle, addOrDelete) {
  if (addOrDelete) {
    return {
      type: types.ADD_SEARCH_CATEGORY,
      categoryTitle: categoryTitle,
    }
  } else {
    return {
      type: types.REMOVE_SEARCH_CATEGORY,
      categoryTitle: categoryTitle
    }
  }
}

export function fetchCategories(){
  return dispatch => {
    dispatch({
      type: types.REQUEST_CATEGORIES
    })
    return fetch(allCategoriesEndpoint)
      .then(response => response.json())
      .then(json => dispatch({
        type: types.RECEIVE_CATEGORIES,
        categories: json
      }))
  }
}

export function fetchCategoriesAndPages(){
  return dispatch => {
    dispatch({
      type: types.REQUEST_CATEGORIES_AND_PAGES
    })
    return fetch(categoriesAndPagesEndpoint)
      .then(response => response.json())
      .then(json => dispatch({
        type: types.RECEIVE_CATEGORIES_AND_PAGES,
        categories: json
      }))
  }
}

export function toggleCategory(pageUrl, category, addOrDelete){
  return dispatch => {
    dispatch(updatePageCategory(category, addOrDelete))
    var endpoint = addOrDelete ? addPageCategoryEndpoint : deletePageCategoryEndpoint;
    return fetch(endpoint, {
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
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

export function toggleSearchSelector() {
  return dispatch => {
    dispatch({
      type: types.TOGGLE_SEARCH_SELECTOR
    })
  }
}

export function addSearchCategory(categoryTitle, addOrDelete) {
  return dispatch => {
    dispatch(updateSearchCategory(categoryTitle, addOrDelete))
  }
}
