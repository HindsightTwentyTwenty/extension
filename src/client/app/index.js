import React from 'react';
import ReactDOM from 'react-dom';
import { Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import thunkMiddleware from 'redux-thunk'

import { Router, hashHistory, browserHistory } from 'react-router';
import routes from './routes';

import App from './components/app';

let store = createStore(
  rootReducer,
  { categories:[],
    currentPage: {
      url: "",
      title: "",
      categories: [],
      star: false
    },
    currentTabs:[],
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
