import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as urls from '../../constants/GlobalConstants';
import TagSelection from './TagSelection.js';
import * as PopupConstants from '../../constants/PopupConstants.js';
import * as PopupActions from '../../actions/Popup/PopupActions.js';





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

class TagBox extends Component{
  constructor(props){
    super(props);
    this.state = getState();
  }

  switchOpen(){
    if(this.state.open){
      console.log("tag box props", this.props);
      this.setState({
        open: false,
      })
    }else{
      this.setState({
        open: true,
      })
    }
  }

  openApp(){
      if(this.props.currentUser.token.length){
        chrome.tabs.create({'url': chrome.extension.getURL('/app/main.html')}, function(tab){
        });
      }
  }

  boxState(){
    /* in order to get imgs from the chrome app must access the imgs on the backend using IMG_URL constant + img path */
    // var logo_url =  urls.IMG_URL + "logo-light.png";
    var sidebarBoxHeader= <div className="sidebar-box-header" onClick={this.switchOpen.bind(this)}>
                            <img className="logo" id="popup-header-logo" src="../../assets/img/logo-light.png" onMouseDown={this.openApp.bind(this)}/>
                          </div>;

    var sidebarBoxContent=  <div>
                              <div className="sidebar-box-header" onClick={this.switchOpen.bind(this)}>
                                <img className="logo" id="popup-header-logo" src="../../assets/img/logo-light.png" onMouseDown={this.openApp.bind(this)}/>
                              </div>
                              <div className="sidebar-box-content">
                                <TagSelection/>
                              </div>
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
    currentUser : state.currentUser,
		currentPage : state.currentPage
})

let mapDispatchToProps = (dispatch) => {
  return {
    popup_actions: bindActionCreators(PopupActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagBox);
