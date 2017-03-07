import {combineReducers} from 'redux';
import currentPageReducer from './CurrentPageReducer.js';
import categoryReducer from './CategoryReducer.js';
import currentTabsReducer from './CurrentTabsReducer.js';
import timeReducer from './TimeReducer.js';
import lookBackNavReducer from './LookBackNavReducer.js';
import lookBackReducer from './lookBackReducer.js';
import searchCategoryReducer from './SearchCategoryReducer.js';
import categoryPagesReducer from './CategoryPagesReducer.js';
import userReducer from './UserReducer.js';
import blacklistReducer from './BlacklistReducer.js';
import searchReducer from './SearchReducer.js';
import popupSelectionReducer from './PopupSelectionReducer';
import sessionsReducer from './SessionsReducer';
import autoSuggestReducer from './autoSuggestReducer';

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

const appReducer = combineReducers({
  blacklist: blacklistReducer,
  currentSearchCategories: searchCategoryReducer,
  categories: categoryReducer,
  currentPage: currentPageReducer,
  currentTabs: currentTabsReducer,
  currentTime: timeReducer,
  currentDomain: lookBackReducer,
  lookbackNav: lookBackNavReducer,
  categoriesAndPages: categoryPagesReducer,
  currentUser: userReducer,
  currentDomainDisplayed: lookBackReducer,
  search: searchReducer,
  sessions: sessionsReducer,
  popupSelection: popupSelectionReducer,
  autoSuggest: autoSuggestReducer
});

export default rootReducer;
