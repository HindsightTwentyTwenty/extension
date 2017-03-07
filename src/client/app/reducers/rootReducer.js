import {combineReducers} from 'redux';
import currentPageReducer from './CurrentPageReducer.js';
// import categoryReducer from './CategoryReducer.js';
import currentTabsReducer from './CurrentTabsReducer.js';
import timeReducer from './TimeReducer.js';
import lookBackNavReducer from './LookBackNavReducer.js';
import lookBackReducer from './lookBackReducer.js';
import searchCategoriesReducer from './searchCategoriesReducer.js';
import categoriesPagesReducer from './CategoriesPagesReducer.js';
import userReducer from './UserReducer.js';
import pageDisplayReducer from './PageDisplayReducer.js';
import blacklistReducer from './BlacklistReducer.js';
import searchReducer from './SearchReducer.js';
import popupSelectionReducer from './PopupSelectionReducer';
import sessionsReducer from './SessionsReducer';

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

const appReducer = combineReducers({
  blacklist: blacklistReducer,
  searchCategories: searchCategoriesReducer,
  // categories: categoryReducer,
  currentPage: currentPageReducer,
  currentTabs: currentTabsReducer,
  currentTime: timeReducer,
  currentDomain: lookBackReducer,
  lookbackNav: lookBackNavReducer,
  categoriesAndPages: categoriesPagesReducer,
  currentUser: userReducer,
  currentDomainDisplayed: lookBackReducer,
  search: searchReducer,
  sessions: sessionsReducer,
  popupSelection: popupSelectionReducer
});

export default rootReducer;
