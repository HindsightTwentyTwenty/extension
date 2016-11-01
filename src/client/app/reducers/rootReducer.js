import {combineReducers} from 'redux';
import tabReducer from './TabReducer.js';
import pageReducer from './PageReducer.js';
import categoryReducer from './CategoryReducer.js';

const rootReducer = combineReducers({
  pages: pageReducer,
  categories: categoryReducer,
  // tabs: tabReducer
});

export default rootReducer;
