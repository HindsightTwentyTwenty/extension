import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';

import SidebarBox from './SidebarBox';

class Sidebar extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="sidebar">
        <SidebarBox boxTitle="hindsite"/>
        <SidebarBox boxTitle="Notes"/>
        <SidebarBox boxTitle="Quick Tags"/>
      </div>
    );
  }

}

let mapStateToProps = (state) => ({
})

let mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
