import * as types from '../../constants/ActionTypes';
import * as urls from '../../constants/GlobalConstants';
import fetch from 'isomorphic-fetch'

const addCategoryEndpoint = urls.BASE_URL + "addcategory/";
const pageInfoEndpoint = urls.BASE_URL + "checkcategories/";

export function getPageInfo(token){
  return dispatch => {
    return fetch(pageInfoEndpoint, {
          headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Authorization': 'Token ' + token
           },
           method: "POST"
         }
       )
      .then(response => response.json())
      .then(json => dispatch({
        type: types.RECEIVE_PAGE_INFO,
        categories: json.categories,
        url: json.url,
        star: json.star,
        title: json.title
      })
    )
  }
}

export function pushCategory(category, token){
  return dispatch => {
    return fetch(addCategoryEndpoint, {
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': 'Token ' + token
             },
             method: "POST",
             body: JSON.stringify({category: category})
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
