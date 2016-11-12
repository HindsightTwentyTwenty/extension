import * as types from '../constants/ActionTypes';

const domainInfo = (state, action) => {
  switch (action.type) {
    case types.UPDATE_DOMAIN_DETAILS_DISPLAY:
      return {
        base_url: action.domain.base_url,
        closed: action.domain.closed,
        created: action.domain.created,
        favicon: action.domain.favicon,
        minutes_active: action.domain.minutes_active,
        pages: action.domain.pages,
        title: action.domain.title
      }
  }
}

function lookBackReducer(state = {base_url: "", closed: "", created: "", favicon: "", minutes_active: "", pages: "", title: ""}, action){
  switch(action.type){
    case types.UPDATE_DOMAIN_DETAILS_DISPLAY:
      return Object.assign({}, domainInfo(state, action));
    default:
      return state;
  }
}

export default lookBackReducer;
