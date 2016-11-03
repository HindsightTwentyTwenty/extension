import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as PopupActions from '../../actions/Popup/PopupActions.js';


class CategoryEntry extends Component {

  render () {
    return (
      <div className="container">
        <div className ="row">
          <div className="col-xs-12">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="New Category..." ref={node => {
                this.input = node;
              }} />
              <span className="input-group-btn">
                <button className="btn btn-primary add-category-btn" type="button" onClick={() => {
                  this.props.popup_actions.pushCategory(this.input.value);
                  this.input.value = '';
                }}>+</button>
              </span>
            </div>
          </div>
        </div>
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
