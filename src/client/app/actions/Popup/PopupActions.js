import * as types from '../../constants/ActionTypes';
import fetch from 'isomorphic-fetch'

export function addPage(ptitle, purl, pstarred, pcategories){

  return {
    type: types.ADD_PAGE,
    url: purl,
    title: ptitle,
    starred: pstarred,
    pcategories: pcategories,
  }
}

// export function addCategory(ctitle){
//   return {
//     type: types.ADD_CATEGORY,
//     title: ctitle
//   }
// }
//

export function receiveCategories(json) {
  return {
    type: RECEIVE_CATEGORIES,
    categories: json.data.children.map(child => child.data)
  }
}

// TODO: add requests for specific users
export function requestCategories() {
  return {
    type: REQUEST_CATEGORIES
  }
}

export function fetchCategories(){
  return dispatch => {
    dispatch(requestCategories())
    // TODO: change from local host
    return fetch('http://127.0.0.1:8000/categories/')
      .then(response => response.json())
      .then(json => dispatch(receiveCategories(json)))
  }
}
