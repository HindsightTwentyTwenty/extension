import * as types from '../../constants/ActionTypes';
import fetch from 'isomorphic-fetch'
import * as urls from '../../constants/GlobalConstants';

const domainInfoEndpoint = urls.BASE_URL + "domaininfo/";
const searchEnpoint = urls.BASE_URL + "search/";

// TODO: date specifc GET requests
// tabs->domains->page_visits->pages->categories

export function changeStartDate(new_start_date) {
  return {
    type: types.UPDATE_START_DATE,
    start_date: new_start_date
  }
}

export function changeEndDate(new_end_date) {
  return {
    type: types.UPDATE_END_DATE,
    end_date: new_end_date
  }
}

export function changeTimeframe(new_start_date, new_end_date) {
  return {
    type: types.UPDATE_TIMEFRAME,
    start_date: new_start_date,
    end_date: new_end_date
  }
}

export function setCurrentPage(page, visited) {
  return {
    type: types.SET_CURRENT_PAGE,
    page: page,
    visited: visited
  }
}

export function updateDisplayDomain(json, clicked) {
  return {
    type: types.UPDATE_DISPLAY_DOMAIN,
    json: json,
    clicked: clicked
  }
}

export function searchResultsReturned(json) {
  console.log("results", json
  )
  return {
    type: types.SEARCH_ITEM,
    json: json,
  }
}

export function toggleDomainClicked() {
  return {
    type: types.TOGGLE_DOMAIN_CLICKED
  }
}

export function searchTerm(search_term, token){
  return dispatch => {
    return fetch(searchEnpoint, {
          headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Authorization': "Token " + token
           },
           method: "POST",
           body: JSON.stringify({"query": search_term})
         }
       )
      .then(response => response.json())
      .then(json => dispatch(searchResultsReturned(json, true)))
  }
}


export function getDomain(pk, token){
  return dispatch => {
    return fetch(domainInfoEndpoint, {
          headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Authorization': "Token " + token
           },
           method: "POST",
           body: JSON.stringify({pk: pk})
         }
       )
      .then(response => response.json())
      .then(json => dispatch(updateDisplayDomain(json, true)))
  }
}
