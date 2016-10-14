import React from 'react';
import ReactDOM from 'react-dom';
import { createStore , Provider} from 'redux';
import rootReducer from './reducers/rootReducer';

import { Router, browserHistory } from 'react-router';
import routes from './routes.jsx';

let store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}><Router history={browserHistory} routes={routes} /></Provider>,
  document.getElementById('hindsite')
);
