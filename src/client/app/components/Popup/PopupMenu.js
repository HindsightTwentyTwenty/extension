import React, { PropTypes, Component } from 'react'
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as PopupActions from '../../actions/Popup/PopupActions.js';
import * as PopupConstants from '../../constants/PopupConstants.js'

class PopupMenu extends Component {
  constructor(props) {
    super(props);
  }

  changePopupTab(tabID) {

  }

  getMenuItems() {
    return PopupConstants.POPUP_MENU_ITEMS.map( function (menuItem) {
      return <div key={menuItem.id}
      className="popup-menu-item"
      onMouseDown={()=>{this.changePopupTab(menuItem.id)}}>
        {menuItem.tabName}
      </div>
    })
  }

  render () {
    return (
      <div className="popup-menu">
        {this.getMenuItems()}
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    popupSelection : state.popup
})

let mapDispatchToProps = (dispatch) => {
  return {
		popup_actions: bindActionCreators(PopupActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupMenu);
