import {combineReducers} from 'redux';
import tabReducer from './TabReducer.js';
import pageReducer from './PageReducer.js';
import categoryReducer from './CategoryReducer.js';

const rootReducer = combineReducers({
  //page: pageReducer,
  categories: categoryReducer
});

export default rootReducer;
