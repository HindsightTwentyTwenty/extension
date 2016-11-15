import * as types from '../constants/ActionTypes';

const page = (state, action) => {
  switch (action.type) {
    case types.UPDATE_DISPLAY_PAGE:
      return {
        title: action.page.title,
        url: action.page.url,
        starred: action.page.starred,
        categories: action.page.categories
      }
    default:
      return state
  }
}

function pageDisplayReducer(state = {}, action){
  switch(action.type){
    case types.UPDATE_DISPLAY_PAGE:
        return action.page;
    default:
        return state;
  }
}

export default pageDisplayReducer;
