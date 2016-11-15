import * as types from '../../constants/ActionTypes';
import fetch from 'isomorphic-fetch'
import * as urls from '../../constants/GlobalConstants';

const domainInfoEndpoint = urls.BASE_URL + "domaininfo/";
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

export function fetchPages(){
  return dispatch => {
    dispatch(requestPages())
    // TODO: change from local host
    return fetch('http://127.0.0.1:8000/pages/')
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

export function updateDisplayPage(page) {
  return {
    type: types.UPDATE_DISPLAY_PAGE,
    page: page
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


export function getDomain(pk, clicked){
  return dispatch => {
    return fetch(domainInfoEndpoint, {
          headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           },
           method: "POST",
           body: JSON.stringify({pk: pk})
         }
       )
      .then(response => response.json())
      .then(json => dispatch(updateDisplayDomain(json, clicked)))
  }
}
