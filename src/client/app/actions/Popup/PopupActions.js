import * as types from '../../constants/ActionTypes';
import * as urls from '../../constants/GlobalConstants';
import fetch from 'isomorphic-fetch'

const categoriesEndpoint = urls.BASE_URL + "categories/";

export function addPage(ptitle, purl, pstarred, pcategories){

  return {
    type: types.ADD_PAGE,
    url: purl,
    title: ptitle,
    starred: pstarred,
    pcategories: pcategories,
  }
}

export function receiveCategories(json) {
  console.log(json);
  return {
    type: types.RECEIVE_CATEGORIES,
    categories: json
  }
}

export function receivePushCategory(json) {
  console.log(json);
  return {
    type: types.RECEIVE_PUSH_CATEGORY,
    category_added: json
  }
}

// TODO: add requests for specific users
export function requestCategories() {
  return {
    type: types.REQUEST_CATEGORIES
  }
}

export function requestPushCategory() {
  return {
    type: types.REQUEST_PUSH_CATEGORY
  }
}

export function fetchCategories(){
  return dispatch => {
    dispatch(requestCategories())
    // TODO: change from local host
    return fetch(categoriesEndpoint)
      .then(response => response.json())
      .then(json => dispatch(receiveCategories(json)))
  }
}

export function pushCategory(category){
  return dispatch => {
    dispatch(requestPushCategory())
    // TODO: change from local host
    return fetch(categoriesEndpoint, {
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
             },
             method: "POST",
             body: JSON.stringify({title: category})
           }

      )
      .then(response => response.json())
      .then(json => dispatch(receivePushCategory(json)))
  }
}
