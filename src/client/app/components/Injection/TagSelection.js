import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';

function getState(){
  return{
  }
}

class TagSelection extends Component{
  constructor(props){
    super(props);
    this.state = getState();
    console.log("props");
    console.log(this.props.currentPage.title);
  }

  render(){
    return(
      <div id="tag-selection-wrapper">
          <div id="sbr-page-title">{this.props.currentPage.title}</div>
      </div>
    );
  }

}

let mapStateToProps = (state) => ({
  currentPage : state.currentPage
})

let mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagSelection);
