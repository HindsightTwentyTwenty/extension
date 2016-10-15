import React from 'react';
import {render} from 'react-dom';
import TabsComponent from './TabsComponent.jsx';
import tabActions from './actions/tabActions';

class Tab extends React.Component {
  getTabs(){
    this.props.
    this.props.tabActions
  }


  render () {
    return (
      <div>
      {this.props.tabs}
      {this.getTabs()}
        <p> Hello React! hi grace! what what </p>
        <TabsComponent />
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    tabs : state.tabs
  }
}

let mapDispatchToProps = () => {
  return {
    newtab : tabActions.newtab
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tab);
//render(<Tab/>, document.getElementById('hindsite'));
