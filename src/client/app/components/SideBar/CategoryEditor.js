import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as GlobalConstants from '../../constants/GlobalConstants.js';
import * as PopupActions from '../../actions/Popup/PopupActions.js'
import * as CategoryActions from '../../actions/Category/CategoryActions.js'

function getState(){
  return{
    cat_title : "",
    edited: false
  }
}

class CategoryEditor extends Component {
  constructor(props) {
    super(props);
    this.categoryColors = GlobalConstants.CAT_COLORS;
    this.category = this.props.categories.cats[this.props.appNav.editCatPK];
    this.state = getState();
    this.setState({
      cat_title : this.category.title,
      edited: false
    });
    console.log(this.state);
  }

  closeEdit(){
    this.setState({
      cat_title : "",
      edited: false
    });
    this.props.onClose("select");
  }


  changeEditColor(color) {
    document.getElementById(color.name).style.width = 27;
    document.getElementById(color.name).style.border = "1px solid $hindsite-black";
    this.props.category_actions.setEditCatColor(color);
  }

  getColors() {
    return this.categoryColors.map((color) => {
      return <div className='color-square'
      onClick={this.changeEditColor.bind(this, color)}
      style={{"backgroundColor" : color.code}}
      key={color.name}
      id = {color.name}>
      </div>
    });
  }

  logNewCatTitle(event){
    this.setState({
      cat_title : event.target.value,
      edited: true
    });
  }

  editCategory(){
    var newTitle = this.state.edited ? this.state.cat_title : this.category.title;
    this.props.category_actions.editCategory(this.category.pk, this.category.title, newTitle, this.props.categories.editCatColor.code, this.props.currentUser.token);
    this.closeEdit();
  }

  deleteCategory(){
    this.props.category_actions.deleteCategory(this.category.pk, this.category.title, this.props.currentUser.token);
  }

  render () {
      return (
        <div id="category-create">
          <div className="row-createcategory">
            <i className="fa fa-2x fa-times exit-icon" aria-hidden="true" onClick={this.closeEdit.bind(this)}></i>
          </div>
          <div className="row-createcategory">
            <p id="label-newtag">edit tag:</p>
            <div id="new-cat-form">
              <input type="text" className="login-form form-control" id="input-newcat" defaultValue={this.category.title} onChange={this.logNewCatTitle.bind(this)}/>
              <div className="row-createcategory">
                <p>choose color:</p>
              </div>
              <div className="row-createcategory category-create-btns" id="color-swatch-row">
                {this.getColors()}
              </div>
              <div className="row-createcategory category-create-btns" >
                <div className="btn-new-cat" id="btn-new-cat-cancel" onClick={this.closeEdit.bind(this)}>cancel</div>
                <div className="btn-new-cat" id="btn-new-cat-save" onClick={this.editCategory.bind(this)}>save</div>
                <div className="btn-delete-cat" onClick={this.deleteCategory.bind(this)}><i className="fa fa-trash-o" aria-hidden="true"></i></div>
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
    cat_state : state.popupSelection.cat_state,
    categories : state.popupCategories,
    appNav : state.appNav
})

let mapDispatchToProps = (dispatch) => {
  return {
    popup_actions : bindActionCreators(PopupActions, dispatch),
    category_actions : bindActionCreators(CategoryActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryEditor);
