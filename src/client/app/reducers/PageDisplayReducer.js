import * as types from '../constants/ActionTypes';

const initState = { url: "", categories: [], star: false, title: ""};
const page = (state, action) => {
  switch (action.type) {
    case types.UPDATE_DISPLAY_PAGE:
      if(action.save == false){
        return {
          initState
        }
      }
      return {
        title: action.page.page.title,
        url: action.page.page.url,
        starred: action.page.page.starred,
        categories: action.page.page.categories
      }
    default:
      return state
  }
}

function pageDisplayReducer(state = initState, action){
  switch(action.type){
    case types.UPDATE_DISPLAY_PAGE:
        return Object.assign({}, page(state,action));
    default:
        return state;
  }
}

export default pageDisplayReducer;
