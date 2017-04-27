import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
// import { store } from '../../index.js';
//
// import Popup from '../Popup/Popup.js';

class Sidebar extends Component{
  constructor(props){
    super(props);
    // console.log(store);
  }

  // <Provider store={store}>
  // <div>
  //   <h1>REACT TEST</h1>
  //   <Popup/>
  // </div>
  // </Provider>
  render(){
    return(
      <div>
        <h1>REACT TEST</h1>
      </div>
    );
  }

}

export default Sidebar;

// let mapStateToProps = (state) => ({
// })
//
// let mapDispatchToProps = (dispatch) => {
//   return {
//   }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
