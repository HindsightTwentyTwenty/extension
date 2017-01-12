import * as types from '../../constants/ActionTypes';
import fetch from 'isomorphic-fetch'
import * as urls from '../../constants/GlobalConstants';

const domainInfoEndpoint = urls.BASE_URL + "domaininfo/";
const pagesEndpoint =  urls.BASE_URL + "pages/";
// TODO: date specifc GET requests
// tabs->domains->page_visits->pages->categories

export function receivePages(json) {
  return {
    type: types.RECEIVE_PAGES,
    categories: json
  }
}

// TODO: add requests for specific users
export function requestPages() {
  return {
    type: types.REQUEST_PAGES
  }
}

export function fetchPages(token){
  return dispatch => {
    dispatch(requestPages())
    return fetch(pagesEndpoint, {
          headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Authorization': "Token " + token
           },
           method: "POST",
         }
       )
      .then(response => response.json())
      .then(json => dispatch(receivePages(json)))
  }
}


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

export function setCurrentPage(page, save) {
  return {
    type: types.SET_CURRENT_PAGE,
    page: page,
    save: save
  }
}

export function updateDisplayDomain(json, clicked) {
  return {
    type: types.UPDATE_DISPLAY_DOMAIN,
    json: json,
    clicked: clicked
  }
}

export function toggleDomainClicked() {
  return {
    type: types.TOGGLE_DOMAIN_CLICKED
  }
}


export function getDomain(pk, clicked, token){
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
      .then(json => dispatch(updateDisplayDomain(json, clicked)))
  }
}
