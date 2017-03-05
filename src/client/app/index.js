import React from 'react';
import ReactDOM from 'react-dom';
import { Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import thunkMiddleware from 'redux-thunk'

import * as PopupConstants from './constants/PopupConstants.js'
import * as GlobalConstants from './constants/GlobalConstants.js'

import { Router, hashHistory, browserHistory } from 'react-router';
import routes from './routes';

import App from './components/app';
import './../chrome/css/app.css';
import './../chrome/css/popup.css';

let store = createStore(
  rootReducer,
  { blacklist: {
      urls: []
    },
    categories: {
      cats: [],
      editCatColor: GlobalConstants.DEFAULT_CAT_COLOR,
      showColorPicker: false,
      confirmDelete: "",
      editCategory: ""
    },
    currentPage: {
      url: "",
      title: "",
      categories: [],
      star: false
    },
    currentTabs:[],
    currentTime:{
      start_date:"",
      end_date:""
    },
    currentDomainDisplayed:{
    },
    categoriesAndPages:{
      catsToPages: {},
      starred: {},
      showStarred: false
    },
    currentSearchCategories: {
      searchCats: []
    },
    sessions: {
      ongoingSession: false,
      durationId: PopupConstants.DURATION_OPTIONS[3].id, //indefinitely
      currentSession:{
        title: "title",
        start: "start",
        end: "end"
      }
    },
    currentUser: {
      user_name:"",
      first_name:"",
      last_name:"",
      email:"",
      created_at:"",
      token:"",
      invalid_login:false,
      change_password:false,
      popup_status:PopupConstants.Loading
    },
    lookbackNav: {
      selection: 0,
      searchTerm: ""
    },
    popupSelection: PopupConstants.POPUP_MENU_ITEMS[0].id, //Categories
    search: {
      results: [],
      dom: "",
      loading: true
    }
  },
  applyMiddleware(
    thunkMiddleware
  )
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('hindsite')
);
