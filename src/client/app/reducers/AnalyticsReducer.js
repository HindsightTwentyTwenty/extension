import * as types from '../constants/ActionTypes';

function analyticsReducer(state = {page_visits: {}, user_domains: {}, user_pages: {}, range: {length: 'week', type: 'current'}, current_user_domain: null}, action){
  switch(action.type){
    case types.RECEIVE_ANALYTICS:
      return {...state, page_visits: action.page_visits, user_domains: action.user_domains, user_pages: action.user_pages };
    case types.CHANGE_RANGE:
      return {...state, range: {length: action.period, type: action.new_type } };
    case types.CHANGE_USER_DOMAIN:
      return {...state, current_user_domain: action.user_domain };
    default:
        return state;
  }
}

export default analyticsReducer;
