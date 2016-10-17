import React from 'react';
import { Router, Route, IndexRoute , hashHistory} from 'react-router';

import App from './components/app.js';
import Tab from './components/Tab/Tab.js'
import Popup from './components/Popup/Popup.js';

export default(
  <Router history={hashHistory}>
    <Route path="/popup.html" component={App}>
      <IndexRoute component={Popup}/>
      <Route path="/app/main.html" component={Tab}/>
    </Route>
  </Router>
);
