import * as types from '../constants/ActionTypes';

const category = (state, action) => {
  switch (action.type) {
    case types.ADD_CATEGORY:
      return {
        title: action.title
      }
    default:
      return state
  }
}

function categoryReducer(state = [], action){
  switch(action.type){
    case types.ADD_CATEGORY:
        for (var i = 0; i < state.length; i++) {
          if (state[i].title == action.title) {
            console.log("Category already exists.");
            return [...state];
          }
        }
        return [...state, category(undefined, action)];
    default:
        return state;
  }

}

export default categoryReducer;
