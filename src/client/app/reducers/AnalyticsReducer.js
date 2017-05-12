import * as types from '../constants/ActionTypes';

function analyticsReducer(state = {page_visits: {}, user_domains: {}, user_pages: {}, hindsite_domains: {}, productivity: {}, range: {length: 'week', type: 'current'}}, action){
  switch(action.type){
    case types.RECEIVE_ANALYTICS:
      return {...state, page_visits: action.page_visits, user_domains: action.user_domains, hindsite_domains: action.hindsite_domains, user_pages: action.user_pages, productivity: action.productivity };
    case types.CHANGE_RANGE:
      return {...state, range: {length: action.period, type: action.new_type } };
    case types.UPDATE_PROCRASTINATION:
      var productivity = Object.assign({}, state.productivity);
      productivity['procrastination_sites'] = action.sites;
      return {...state, productivity: productivity};
    default:
        return state;
  }
}

export default analyticsReducer;
