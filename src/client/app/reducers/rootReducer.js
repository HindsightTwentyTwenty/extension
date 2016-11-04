import {combineReducers} from 'redux';
import tabReducer from './TabReducer.js';
import pageReducer from './PageReducer.js';
import currentPageReducer from './CurrentPageReducer.js';
import categoryReducer from './CategoryReducer.js';

const rootReducer = combineReducers({
  pages: pageReducer,
  categories: categoryReducer,
  currentPage: currentPageReducer
  // tabs: tabReducer
});

export default rootReducer;
