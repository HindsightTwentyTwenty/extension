import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';


/*
have it inherit it's title
basic functionality:
  open and close
  have state of open and closed
*/
function getState(){
  return{
    open: false
  }
}

class SidebarBox extends Component{
  constructor(props){
    super(props);
    this.state = getState();
  }

  switchOpen(){
    /* in order to open new tab need to send message to the background script since the injection
    has no ability to make the calls to the chrome APIs*/
     chrome.runtime.sendMessage({greeting: "openApp"});

    if(this.state.open){
      this.setState({
        open: false,
      })
    }else{
      this.setState({
        open: true,
      })
    }
  }

  boxState(){
    var sidebarBoxHeader= <div className="sidebar-box-header" onClick={this.switchOpen.bind(this)}>    {this.props.boxTitle} </div>;

    var sidebarBoxContent=  <div>
                              <div className="sidebar-box-header" onClick={this.switchOpen.bind(this)}> {this.props.boxTitle} </div>
                              <div className="sidebar-box-content"></div>
                            </div>;

    if(this.state.open){
      return sidebarBoxContent;
    }else{
      return sidebarBoxHeader;
    }
  }
  render(){



    return(
      <div className="sidebar-box">
        {this.boxState()}
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

export default connect(mapStateToProps, mapDispatchToProps)(SidebarBox);
