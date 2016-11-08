import {combineReducers} from 'redux';
import pageReducer from './PageReducer.js';
import currentPageReducer from './CurrentPageReducer.js';
import categoryReducer from './CategoryReducer.js';
import currentTabsReducer from './CurrentTabsReducer.js';
import timeReducer from './TimeReducer.js';
import lookBackReducer from './LookBackReducer.js';



const rootReducer = combineReducers({
  pages: pageReducer,
  categories: categoryReducer,
  currentPage: currentPageReducer,
  currentTabs: currentTabsReducer,
  currentTime: timeReducer,
  currentLookBackSelection: lookBackReducer
});

export default rootReducer;
