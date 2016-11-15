import * as types from '../constants/ActionTypes';

const domainInfo = (state, action) => {
  switch (action.type) {
    case types.TOGGLE_DOMAIN_CLICKED:
        return Object.assign({}, state, {clicked: !state.clicked});
    case types.UPDATE_DISPLAY_DOMAIN:
      return {
        active_times: action.json.active_times,
        base_url: action.json.base_url,
        closed: action.json.closed,
        created: action.json.created,
        favicon: action.json.favicon,
        minutes_active: action.json.minutes_active,
        pages: action.json.pages,
        pagevisits: action.json.pagevisits,
        pk: action.json.pk,
        title: action.json.title,
        clicked: action.clicked
      }
    }
}

function lookBackReducer(state = {active_times:[], base_url: "", closed: "", created: "", favicon: "", minutes_active: "", pages: "", pagevisits: [], pk: "", title: ""}, action){
  switch(action.type){
    case types.TOGGLE_DOMAIN_CLICKED:
      return Object.assign({}, domainInfo(state, action));
    case types.UPDATE_DISPLAY_DOMAIN:
      return Object.assign({}, domainInfo(state, action));
    default:
      return state;
  }
}

export default lookBackReducer;
