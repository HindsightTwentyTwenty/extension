import React from 'react';
import ReactDOM from 'react-dom';
import { Provider} from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

import { Router, hashHistory, browserHistory } from 'react-router';
import routes from './routes';

import App from './components/app';

let store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('hindsite')
);
