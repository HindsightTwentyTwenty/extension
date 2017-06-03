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
    }
}

class TagBox extends Component{
  constructor(props){
    super(props);
    this.state = getState();
  }

  switchOpen(){
    /* close box if clicked and open, otherwise open box */
    if(this.props.box_state == 'tag'){
      this.props.popup_actions.changePopupBoxState('closed');
    }else{
      this.props.popup_actions.changePopupBoxState('tag');
    }
  }

  openApp(){
      if(this.props.currentUser.token.length){
        chrome.tabs.create({'url': chrome.extension.getURL('/app/main.html')}, function(tab){
        });
      }
  }

  boxState(){
    /* TODO- gam, if want to add back in carets
    <i className="fa fa-3x fa-caret-left icon-caret" aria-hidden="true"></i>
    <i className="fa fa-3x fa-caret-down icon-caret" aria-hidden="true"></i>
    */

    var sidebarBoxHeader= <div className="sidebar-box-header" onClick={this.switchOpen.bind(this)}>
                            Tags
                            <div className="popup-header" onMouseDown={this.openApp.bind(this)}>
                                <img className="header-height logo"  src="../../assets/img/logo-light.png"/>
                                <div id="logo-text-wrap">
                                  <p id="go-to-timeline">to timeline</p>
                                </div>
                            </div>
                          </div>;

    var sidebarBoxContent=  <div>
                              <div className="sidebar-box-header" onClick={this.switchOpen.bind(this)}>
                                Tags
                                <div className="popup-header" onMouseDown={this.openApp.bind(this)}>
                                    <img className="header-height logo"  src="../../assets/img/logo-light.png"/>
                                      <p id="go-to-timeline">to timeline</p>
                                </div>
                              </div>
                              <div className="sidebar-box-content">
                                <TagSelection/>
                              </div>
                            </div>;
    if(this.props.box_state == 'tag'){
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
		currentPage : state.currentPage,
    box_state: state.popupSelection.box_state,
})

let mapDispatchToProps = (dispatch) => {
  return {
    popup_actions: bindActionCreators(PopupActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagBox);
