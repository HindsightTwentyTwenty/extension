import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';

import * as PopupActions from '../../actions/Popup/PopupActions.js'
import EditNote from '../SideBar/EditNote.js'

class NotesBox extends Component{
  constructor(props){
    super(props);
  }

  switchOpen(){
    /* close box if clicked and open, otherwise open box */
    if(this.props.box_state == 'notes'){
      this.props.popup_actions.changePopupBoxState('closed');
    }else{
      this.props.popup_actions.changePopupBoxState('notes');
    }
  }

  boxState(){
    var sidebarBoxHeader= <div className="sidebar-box-header" onClick={this.switchOpen.bind(this)}>
                              Notes
                          </div>;

    var sidebarBoxContent=  <div>
                              <div className="sidebar-box-header" onClick={this.switchOpen.bind(this)}>
                                  Notes
                              </div>
                              <div className="sidebar-box-content">
                                <EditNote/>
                              </div>
                            </div>;

    if(this.props.box_state == 'notes'){
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
  box_state: state.popupSelection.box_state
})

let mapDispatchToProps = (dispatch) => {
  return {
    popup_actions: bindActionCreators(PopupActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesBox);
