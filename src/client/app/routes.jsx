import React from 'react';
import { Router, Route, IndexRoute , hashHistory} from 'react-router';

import App from './components/App.jsx';
import Tab from './components/Tab.jsx'
import Popup from './components/Popup.jsx';

export default(
  <Router history={hashHistory}>
    <Route path="/popup.html" component={App}>
      <IndexRoute component={Popup}/>
      <Route path="/app/main.html" component={Tab}/>
    </Route>
  </Router>
);
