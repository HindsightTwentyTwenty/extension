import * as types from '../../constants/ActionTypes';
import * as urls from '../../constants/GlobalConstants';
import fetch from 'isomorphic-fetch'

const allCategoriesEndpoint = urls.BASE_URL + "categories/";
const pageInfoEndpoint = urls.BASE_URL + "checkcategories/";

export function addPage(ptitle, purl, pstarred, pcategories){

  return {
    type: types.ADD_PAGE,
    url: purl,
    title: ptitle,
    starred: pstarred,
    pcategories: pcategories,
  }
}

export function receivePageInfo(json) {
  return {
    type: types.RECEIVE_PAGE_INFO,
    categories: json.categories,
    url: json.url,
    star: json.star,
    title: json.title
  }
}

export function receivePushCategory(json) {
  return {
    type: types.RECEIVE_PUSH_CATEGORY,
    category_added: json
  }
}

export function requestPushCategory() {
  return {
    type: types.REQUEST_PUSH_CATEGORY
  }
}

export function getPageInfo(url){
  return dispatch => {
    return fetch(pageInfoEndpoint, {
          headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           },
           method: "POST",
           body: JSON.stringify({url: url})
         }
       )
      .then(response => response.json())
      .then(json => dispatch(receivePageInfo(json)))
  }
}

export function pushCategory(category){
  return dispatch => {
    dispatch(requestPushCategory())
    return fetch(allCategoriesEndpoint, {
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
