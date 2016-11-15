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

const rootReducer = combineReducers({
  pages: pageReducer,
  currentSearchCategories: searchCategoryReducer,
  categories: categoryReducer,
  currentPage: currentPageReducer,
  currentTabs: currentTabsReducer,
  currentTime: timeReducer,
  currentLookBackSelection: lookBackNavReducer,
  currentDomainDisplayed: lookBackReducer,
  categoriesAndPages: categoryPagesReducer
});

export default rootReducer;
