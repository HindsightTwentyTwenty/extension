import React from 'react';
import {render} from 'react-dom';
import TabsComponent from './TabsComponent.jsx';

class Tab extends React.Component {
  render () {
    return (
      <div>
        <p> Hello React! hi grace! what what </p>
        <TabsComponent />
      </div>
    )
  }
}

export default Tab;
//render(<Tab/>, document.getElementById('hindsite'));
