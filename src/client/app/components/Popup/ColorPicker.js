import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as GlobalConstants from '../../constants/GlobalConstants.js';
import * as PopupActions from '../../actions/Popup/PopupActions.js';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';

class ColorPicker extends Component {
  constructor(props) {
    super(props);
  }

  changeEditColor(color) {
    this.props.category_actions.setEditCatColor(color);
    this.props.category_actions.toggleColorPicker(false);
  }

  getColorSquares() {
    var className = 'color-square ' + this.editColor;
    return <div className={className} key={this.editColor}
    onClick={()=> this.props.category_actions.toggleColorPicker(!this.props.categories.showColorPicker)}></div>;
  }

  render () {
    return (
    <div className="color-picker">
      {this.getColorSquares()}
    </div>
    )
  }
}

let mapStateToProps = (state) => ({
    categories : state.categories,
    currentPage : state.currentPage,
    currentUser : state.currentUser
})

let mapDispatchToProps = (dispatch) => ({
    popup_actions: bindActionCreators(PopupActions, dispatch),
    category_actions: bindActionCreators(CategoryActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ColorPicker);
