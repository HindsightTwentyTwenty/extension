import * as types from '../../constants/ActionTypes';
import fetch from 'isomorphic-fetch';
import * as urls from '../../constants/GlobalConstants';
import * as NavActions from '../LookBackNav/LookBackNavActions.js';
import * as LookBackSections from '../../constants/LookBackConstants.js';
import * as SearchConstants from '../../constants/SearchConstants.js';
import moment from 'moment';
import 'moment-timezone';

const domainInfoEndpoint = urls.BASE_URL + "domaininfo/";
const domEndpoint = urls.BASE_URL + "gethtml/";
const searchEndpoint = urls.BASE_URL + "search/";

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
  return {
    type: types.SEARCH_RESULTS,
    search_results: json,
  }
}

export function toggleDomainClicked() {
  return {
    type: types.TOGGLE_DOMAIN_CLICKED
  }
}

export function domReturned(json){
  return{
    type: types.SET_CURR_DOM,
    dom: json['html']
  }
}

export function clearDOM(){
  return{
    type: types.SET_CURR_DOM,
    dom: "loading"
  }
}
export function searchTermNav(search_term, token){
  return dispatch => {
    dispatch(searchTerm(search_term, moment().subtract(2, 'year').tz("UTC").format(), moment().tz("UTC").format(), "", SearchConstants.Relevance, token))
  }
}

export function searchTerm(search_term, start_time, end_time, category_selection, sort_selection, token){
  // This is gross. Will clean up
  var bodyInfo;
  if(category_selection){
    bodyInfo = JSON.stringify({"query": search_term, "category": category_selection, "order": sort_selection, "start_time": start_time.substring(0,start_time.lastIndexOf("-")), "end_time": end_time.substring(0,end_time.lastIndexOf("-"))});
  } else {
    bodyInfo = JSON.stringify({"query": search_term, "order": sort_selection, "start_time": start_time.substring(0,start_time.length - 1), "end_time": end_time.substring(0,end_time.length - 1)})
  }
  return dispatch => {
    return [
      dispatch(NavActions.switchLookBackSelection(LookBackSections.Search, search_term)),
      fetch(searchEndpoint, {
          headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Authorization': "Token " + token
           },
           method: "POST",
           body: bodyInfo
         }
       )
      .then(response => response.json())
      .then(json => dispatch(searchResultsReturned(json)))
    ]
  }
}

export function getDOM(pk, token, origin){
  return dispatch => {
    return fetch(domEndpoint, {
          headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Authorization': "Token " + token
           },
           method: "POST",
           body: JSON.stringify({"pk": pk, "page": origin})
         }
       )
      .then(response => response.json())
      .then(json => dispatch(domReturned(json)))
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
           body: JSON.stringify({"pk": pk})
         }
       )
      .then(response => response.json())
      .then(json => dispatch(updateDisplayDomain(json, true)))
  }
}
