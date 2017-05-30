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
    popupCategories: {
      cats: {},
      editCatColor: GlobalConstants.DEFAULT_CAT_COLOR,
      showColorPicker: false
    },
    currentPage: {
      url: "",
      title: "",
      created: "",
      visited: "",
      categories: {},
      star: false,
      preview: "",
      note: ""
    },
    currentTabs:[],
    currentTime:{
      start_date:"",
      end_date:""
    },
    currentDomainDisplayed:{},
    categoriesAndPages:{
      catsToPages: {},
      starred: {},
      showStarred: false,
      pkToPages: {}
    },
    currentSearchCategories: {
      searchCats: new Set()
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
      md5:"",
      ekey:"",
      tracking_on:true
    },
    analytics: {
      range: {
        length: 'week',
        type: 'current'
      },
      page_visits: {
        day: [],
        week: {
          current: [],
          last: [],
          average: []
        },
        month: []
      },
      user_domains: {
        day: [],
        week: [],
        month: []
      },
      hindsite_domains: {
        day: [],
        week: [],
        month: []
      },
      user_pages: {
        day: [],
        week: [],
        month: []
      },
      productivity: {
        procrastination_sites: [],
        visits: {
          day: [],
          week: [],
          month: []
        },
        minutes: {
          day: [],
          week: [],
          month: []
        }
      }
    },
    appNav: {
      menuSelection: 0,
      searchTerm: "",
      categoriesView: "select",
      editCatPK: 0,
      modalView: "info"
    },
    popupSelection: {
      cat_state: "",
      box_state: "tag"
    }, //Categories
    search: {
      results: [],
      dom: "",
      loading: true
    },
    popupStatus: PopupConstants.Loading
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
