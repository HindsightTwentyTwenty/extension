import {combineReducers} from 'redux';
import pageReducer from './PageReducer.js';
import currentPageReducer from './CurrentPageReducer.js';
import categoryReducer from './CategoryReducer.js';
import currentTabsReducer from './CurrentTabsReducer.js';
import timeReducer from './TimeReducer.js';
import lookBackNavReducer from './LookBackNavReducer.js';
import lookBackReducer from './lookBackReducer.js';
import searchCategoryReducer from './SearchCategoryReducer.js';
import categoryPagesReducer from './CategoryPagesReducer.js';
import userReducer from './UserReducer.js';
import pageDisplayReducer from './PageDisplayReducer.js';
import blacklistReducer from './BlacklistReducer.js';

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

const appReducer = combineReducers({
  blacklist: blacklistReducer,
  pages: pageReducer,
  currentSearchCategories: searchCategoryReducer,
  categories: categoryReducer,
  currentPage: currentPageReducer,
  currentTabs: currentTabsReducer,
  currentTime: timeReducer,
  currentDomain: lookBackReducer,
  currentLookBackSelection: lookBackNavReducer,
  categoriesAndPages: categoryPagesReducer,
  currentUser: userReducer,
  currentDomainDisplayed: lookBackReducer,

});

export default rootReducer;
