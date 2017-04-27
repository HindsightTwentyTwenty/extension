import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux'

import Popup from '../../app/components/Popup/Popup.js';

class Sidebar extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <h1>REACT TEST</h1>
        <Popup/>
      </div>
    );
  }

}

// export default Sidebar;

let mapStateToProps = (state) => ({
})

let mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
