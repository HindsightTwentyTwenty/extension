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
    this.categoryColors = GlobalConstants.CAT_COLORS;
  }

  changeEditColor(color) {
    this.props.category_actions.setEditCatColor(color);
    this.props.category_actions.toggleColorPicker(false);
  }

  getColors() {
    return this.categoryColors.map((color) => {
      var className = 'color-square ' + color.name;
      return <div className={className} onClick={this.changeEditColor.bind(this, color)} key={color.name}></div>
    });
  }

  render () {
    return (
    <div className="cateogries-container">
      {this.getColors()}
    </div>
    )
  }
}

let mapDispatchToProps = (dispatch) => ({
    category_actions: bindActionCreators(CategoryActions, dispatch)
})

export default connect(null, mapDispatchToProps)(ColorPicker);
