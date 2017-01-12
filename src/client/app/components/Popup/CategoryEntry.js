import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as PopupActions from '../../actions/Popup/PopupActions.js';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';

class CategoryEntry extends Component {
  addNewCategory(categoryTitle){
      this.props.popup_actions.pushCategory(categoryTitle, this.props.currentUser.token).then(() => {
        var categoryObject;
        for(var i = this.props.categories.length-1; i >= 0; i--){
          if(this.props.categories[i].title == categoryTitle){
            categoryObject = this.props.categories[i];
            break;
          }
        }
        this.props.category_actions.toggleCategory(this.props.currentPage.url, categoryObject, true, this.props.currentUser.token);
    });
  }


  render () {
    if(!this.props.popup){
      var lookBackStyle = {width: '50%'};
    }
    return (
      <div className="container" style={lookBackStyle}>
        <div className ="row">
          <div className="col-xs-12">
            <div className="input-group">
              <input type="text" className="popup-form form-control" placeholder="New Category..." ref={node => {
                this.input = node;
              }} />
              <span className="input-group-btn">
                <button className="btn add-category-btn" type="button" onClick={() => {
                  // TODO: process input values (check for empties) on the backend?
                  if (this.input.value !== '') {
                    this.addNewCategory(this.input.value);
                    this.input.value = '';
                  }
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
    categories : state.categories,
    currentPage : state.currentPage,
    currentUser : state.currentUser

})

let mapDispatchToProps = (dispatch) => ({
    popup_actions: bindActionCreators(PopupActions, dispatch),
    category_actions: bindActionCreators(CategoryActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryEntry);
