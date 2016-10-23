import * as types from '../constants/ActionTypes';

const category = (state, action) => {
  switch (action.type) {
    case types.ADD_CATEGORY:
      return {
        category_title: action.category_title
      }
    default:
      return state
  }
}

function categoryReducer(state = {categories: [] }, action){
  switch(action.type){
    case types.ADD_CATEGORY:
        //new object with title and url in it, and then override url key
        //could use spread to append to string
        return {categories: [...state, category(undefined, action)]};
    default:
        return state;
  }

}

export default categoryReducer;
