import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as GlobalConstants from '../../constants/GlobalConstants.js';

import * as PopupActions from '../../actions/Popup/PopupActions.js'
import * as CategoryActions from '../../actions/Category/CategoryActions.js'



class CategoryCreator extends Component {
  constructor(props) {
    super(props);
    this.categoryColors = GlobalConstants.CAT_COLORS;
  }

  closeCreate(){
    this.props.popup_actions.changePopupCatState("select");
  }


  changeEditColor(color) {
    this.props.category_actions.setEditCatColor(color);
  }

  addNewCategory(categoryTitle){
      this.props.category_actions.pushCategory(categoryTitle, this.props.categories.editCatColor.code, this.props.currentUser.token).then(() => {
        for (var key in this.props.categories.cats) {
          if (categoryTitle == this.props.categories.cats[key].title) {
            this.props.category_actions.toggleCategory(this.props.currentPage.url,
              this.props.categories.cats[key], true, this.props.currentUser.token, this.props.currentPage.title,);
            break;
          }
        }
    });
  }

  getColors() {
    return this.categoryColors.map((color) => {
      return <div className='color-square'
      onClick={this.changeEditColor.bind(this, color)}
      style={{"backgroundColor" : color.code}}
      key={color.name}></div>
    });
  }

  /*
  $h-red: #DB3535 ;
  $h-orange: #EE6953 ;
  $h-yellow: #F7AC2F ;
  $h-teal: #34CCBB ;
  $h-green: #339882 ;
  $h-blue: #3F80D9 ;
  $h-purple: #6454C9 ;
  */
  getColorChoices(){
    // var colors = [ #DB3535, #EE6953, #F7AC2F, #34CCBB, #339882, #3F80D9, #6454C9 ];

    var results = [];

    for(var color in colors){

    }
  }

  render () {
      return (
        <div id="category-create">
          <div className="row-createcategory">
            <i className="fa fa-2x fa-times exit-icon" aria-hidden="true" onClick={this.closeCreate.bind(this)}></i>
          </div>
          <div className="row-createcategory">
            <p id="label-newtag">new tag:</p>
            <div id="new-cat-form">
              <input type="text" className="login-form form-control" id="input-newcat" />
              <div className="row-createcategory">
                <p>choose color:</p>
              </div>
              <div className="row-createcategory" id="color-swatch-row">
                {this.getColors()}
              </div>
              <div className="row-createcategory" id="category-create-btns">
                <div className="btn-new-cat" id="btn-new-cat-cancel">cancel</div>
                <div className="btn-new-cat" id="btn-new-cat-save">save</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

let mapStateToProps = (state) => ({
    currentPage : state.currentPage,
    currentUser : state.currentUser,
    cat_state : state.popupSelection.cat_state
})

let mapDispatchToProps = (dispatch) => {
  return {
    popup_actions : bindActionCreators(PopupActions, dispatch),
    category_actions : bindActionCreators(CategoryActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryCreator);
