import React from 'react';
import { Router, Route, IndexRoute , hashHistory} from 'react-router';

import App from './components/app.js';
import BaseApp from './components/App/App.js'
import Popup from './components/Popup/Popup.js';
import Sidebar from './components/Injection/Sidebar.js';

export default(
  <Router history={hashHistory}>
    <Route path="/app/main.html" component={BaseApp}/>
    <Route path="/popup.html" component={App}>
      <IndexRoute component={Popup}/>
    </Route>
  </Router>
);
