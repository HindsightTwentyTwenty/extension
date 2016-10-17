import React from 'react';
import ReactDOM from 'react-dom';
import { createStore , Provider} from 'redux';
import rootReducer from './reducers/RootReducer';

import { Router, browserHistory } from 'react-router';
import routes from './routes.js';

let store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}><Router history={browserHistory} routes={routes} /></Provider>,
  document.getElementById('hindsite')
);
