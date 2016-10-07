import React from 'react';
import {render} from 'react-dom';
import TabsComponent from './TabsComponent.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
        <p> Hello React! hi grace! what what </p>
        <TabsComponent />
      </div>
    )

  }
}

render(<App/>, document.getElementById('app'));
