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

  getMenuItems() {
    return PopupConstants.POPUP_MENU_ITEMS.map( function (menuItem) {
      var menuItemClassName = this.props.popupSelection == menuItem.id ? "popup-menu-item selected" : "popup-menu-item";
      return <div key={menuItem.id}
      className={menuItemClassName}
      onMouseDown={()=>{this.props.popup_actions.changePopupTab(menuItem.id)}}>
        {menuItem.tabName}
      </div>
    }, this)
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
    popupSelection : state.popupSelection
})

let mapDispatchToProps = (dispatch) => {
  return {
		popup_actions: bindActionCreators(PopupActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupMenu);
