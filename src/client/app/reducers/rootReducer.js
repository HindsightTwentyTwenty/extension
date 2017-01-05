import {combineReducers} from 'redux';
import pageReducer from './PageReducer.js';
import currentPageReducer from './CurrentPageReducer.js';
import categoryReducer from './CategoryReducer.js';
import currentTabsReducer from './CurrentTabsReducer.js';
import timeReducer from './TimeReducer.js';
import lookBackNavReducer from './LookBackNavReducer.js';
import lookBackReducer from './lookBackReducer.js';
import searchCategoryReducer from './searchCategoryReducer.js';
import categoryPagesReducer from './categoryPagesReducer.js';
import userReducer from './userReducer.js';
import pageDisplayReducer from './pageDisplayReducer.js';

const rootReducer = combineReducers({
  pages: pageReducer,
  currentSearchCategories: searchCategoryReducer,
  categories: categoryReducer,
  currentPage: currentPageReducer,
  currentTabs: currentTabsReducer,
  currentTime: timeReducer,
  currentLookBackSelection: lookBackNavReducer,
  currentDomain: lookBackReducer,
  categoriesAndPages: categoryPagesReducer,
  currentUser: userReducer,
  currentDomainDisplayed: lookBackReducer,
});

export default rootReducer;
