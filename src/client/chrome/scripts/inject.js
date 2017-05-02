import React from 'react';
import ReactDOM from 'react-dom';
import { Provider} from 'react-redux';
import { Router, hashHistory, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../../app/reducers/rootReducer';
import thunkMiddleware from 'redux-thunk'

import * as PopupConstants from '../../app/constants/PopupConstants.js'
import * as GlobalConstants from '../../app/constants/GlobalConstants.js'

import Sidebar from '../../app/components/Injection/Sidebar.js';
import Popup from '../../app/components/Popup/Popup.js';

import '../css/app.css';
import '../css/popup.css';
// import '../css/bootstrap.css';

const store = createStore(
  rootReducer,
  { blacklist: {
      urls: []
    },
    categories: {
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
      preview: ""
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
      md5:"",
      ekey:"",
      tracking_on:false
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
    },
    popupStatus: PopupConstants.Loading
  },
  applyMiddleware(
    thunkMiddleware
  )
);


/* add in the css to the head of the body, need to do this programmatically */
// var link = document.createElement("link");
// link.href = "../css/bootstrap.min.css";
// link.type = "text/css";
// link.rel = "stylesheet";
// document.getElementsByTagName("head")[0].appendChild(link);

var link = document.createElement("link");
link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
link.type = "text/css";
link.rel = "stylesheet";
document.getElementsByTagName("head")[0].appendChild(link);



const anchor = document.createElement('div');
anchor.id = 'sbr-anchor';
document.body.insertBefore(anchor, document.body.childNodes[0]);

ReactDOM.render(
  <Provider store={store}>
    <Sidebar />
  </Provider>,
  document.getElementById('sbr-anchor')
);
