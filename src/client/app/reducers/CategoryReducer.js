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
      console.log(action.categories);
      return action.categories
      // return Object.assign({}, state, {
      //   action.categories
      // });
    case types.REQUEST_CATEGORIES:
      return Object.assign({}, state, {});
    case types.RECEIVE_PUSH_CATEGORY:
        // for (var i = 0; i < state.length; i++) {
        //   if (state[i].title == action.title) {
        //     console.log("Category already exists.");
        //     return [...state];
        //   }
        // }
        return [...state, category(undefined, action)];
    default:
        return state;
  }

}

export default categoryReducer;
