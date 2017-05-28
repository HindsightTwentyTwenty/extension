import {combineReducers} from 'redux';
import analyticsReducer from './AnalyticsReducer.js';
import currentPageReducer from './CurrentPageReducer.js';
import categoryReducer from './CategoryReducer.js';
import currentTabsReducer from './CurrentTabsReducer.js';
import timeReducer from './TimeReducer.js';
import navReducer from './NavReducer.js';
import lookBackReducer from './lookBackReducer.js';
import searchCategoryReducer from './SearchCategoryReducer.js';
import categoryPagesReducer from './CategoryPagesReducer.js';
import userReducer from './UserReducer.js';
import blacklistReducer from './BlacklistReducer.js';
import searchReducer from './SearchReducer.js';
import popupSelectionReducer from './PopupSelectionReducer.js';
import sessionsReducer from './SessionsReducer.js';
import popupNavReducer from './popupNavReducer.js';

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

const appReducer = combineReducers({
  analytics: analyticsReducer,
  blacklist: blacklistReducer,
  currentSearchCategories: searchCategoryReducer,
  categories: categoryReducer,
  currentPage: currentPageReducer,
  currentTabs: currentTabsReducer,
  currentTime: timeReducer,
  currentDomain: lookBackReducer,
  appNav: navReducer,
  categoriesAndPages: categoryPagesReducer,
  currentUser: userReducer,
  currentDomainDisplayed: lookBackReducer,
  search: searchReducer,
  sessions: sessionsReducer,
  popupSelection: popupSelectionReducer,
  popupStatus: popupNavReducer
});

export default rootReducer;
