import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';

class Sidebar extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <h1>REACT TEST</h1>
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
