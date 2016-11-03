import * as types from '../../constants/ActionTypes';
import * as urls from '../../constants/GlobalConstants';
import fetch from 'isomorphic-fetch'

const addPageCategoryEndpoint = urls.BASE_URL + "addcategorypage/";
const deletePageCategoryEndpoint = urls.BASE_URL + "deletecategorypage/";
const addCategoryEndpoint = urls.BASE_URL + "addcategory/";
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
