import {combineReducers} from 'redux';
import pageReducer from './PageReducer.js';
import currentPageReducer from './CurrentPageReducer.js';
import categoryReducer from './CategoryReducer.js';
import currentTabsReducer from './CurrentTabsReducer.js';


const rootReducer = combineReducers({
  pages: pageReducer,
  categories: categoryReducer,
  currentPage: currentPageReducer,
  currentTabs: currentTabsReducer
});

export default rootReducer;
