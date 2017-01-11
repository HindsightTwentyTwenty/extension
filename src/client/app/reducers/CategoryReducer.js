import * as types from '../constants/ActionTypes';

const category = (state, action) => {
  switch (action.type) {
    case types.RECEIVE_PUSH_CATEGORY:
      return {
        title: action.category_added.title
      }
    default:
      return state
  }
}

function categoryReducer(state = [], action){
  switch(action.type){
    case types.RECEIVE_CATEGORIES:
      return action.categories;
    case types.REQUEST_CATEGORIES:
    //TODO: Remove empty object source??
      return Object.assign({}, state, {});
    case types.RECEIVE_PUSH_CATEGORY:
      return [...state, category(undefined, action)];
    default:
        return state;
  }
}

export default categoryReducer;
