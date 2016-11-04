import * as types from '../constants/ActionTypes';

const pageInfo = (state, action) => {
  switch (action.type) {
    case types.RECEIVE_PAGE_INFO:
      return {
        url: action.url,
        categories: action.categories,
        star: action.star,
        title: action.title
      }
    // TODO: change {star: !star} ?
    case types.UPDATE_CURRENT_STAR:
      return Object.assign({}, state, {star: action.star});
    default:
      return state
  }
}

function currentPageReducer(state = { url: "", categories: [], star: false, title: ""}, action){
  switch(action.type){
    case types.RECEIVE_PAGE_INFO:
      return Object.assign({}, pageInfo(state, action));
    case types.UPDATE_CURRENT_STAR:
      return Object.assign({}, pageInfo(state, action));
    default:
        return state;
  }
}

export default currentPageReducer;
