import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as PopupActions from '../../actions/Popup/PopupActions.js';


class CategoryEntry extends Component {

  addCategory(event) {
    this.props.popup_actions.addCategory(event.newCategory.value);
  }

  render () {
    return (
      <div>
        <form action={this.addCategory.bind(this)}>
          <input name="newCategory" type="text" placeholder="other..."/>
          <input type="submit" value="save"/>
        </form>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    categories : state.categories
})

let mapDispatchToProps = (dispatch) => ({
    popup_actions: bindActionCreators(PopupActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryEntry);
