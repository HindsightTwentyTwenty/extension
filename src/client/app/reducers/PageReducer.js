import * as types from '../constants/ActionTypes';

const page = (state, action) => {
  switch (action.type) {
    case types.ADD_PAGE:
      return {
        title: action.title,
        url: action.url,
        starred: action.starred,
        categories: action.categories
      }
    default:
      return state
  }
}

function pageReducer(state = {pages: [] }, action){
  switch(action.type){
    case types.ADD_PAGE:
        //new object with title and url in it, and then override url key
        //could use spread to append to string
        return {pages: [...state, page(undefined, action)]};
    default:
        return state;
  }

}

export default pageReducer;
