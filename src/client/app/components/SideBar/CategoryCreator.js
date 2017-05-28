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
    curr_selected_color: ""
  }
}

class CategoryCreator extends Component {
  constructor(props) {
    super(props);
    this.categoryColors = GlobalConstants.CAT_COLORS;
    this.state = getState();
  }

  componentDidMount(){
    var default_color = this.props.categories.editCatColor.name;
    document.getElementById(default_color).style.width = "27px";
    document.getElementById(default_color).style.height = "27px";
    document.getElementById(default_color).style.border = ".5px solid #55524D";
    this.setState({
      curr_selected_color : default_color
    })
  }

  closeCreate(){
    this.setState({
      cat_title : ""
    });
    this.props.popup_actions.changePopupCatState("select");
  }

  changeEditColor(color) {
    var old_color = this.state.curr_selected_color
    /* reset old color */
    document.getElementById(old_color).style.width = "25px";
    document.getElementById(old_color).style.height = "25px";
    document.getElementById(old_color).style.border = "none";
    /* set new color attributes */
    document.getElementById(color.name).style.width = "27px";
    document.getElementById(color.name).style.height = "27px";
    document.getElementById(color.name).style.border = ".5px solid #55524D";
    
    this.props.category_actions.setEditCatColor(color);
    this.setState({curr_selected_color: color.name});
  }

  addNewCategory(){
      this.props.category_actions.pushCategory(this.state.cat_title, this.props.categories.editCatColor.code, this.props.currentUser.token).then(() => {
        for (var key in this.props.categories.cats) {
          if (this.state.cat_title == this.props.categories.cats[key].title) {
            this.props.category_actions.toggleCategory(this.props.currentPage.url,
              this.props.categories.cats[key], true, this.props.currentUser.token, this.props.currentPage.title,);
            break;
          }
        }
        this.closeCreate();
    });

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
      cat_title : event.target.value
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
  // getColorChoices(){
  //   // var colors = [ #DB3535, #EE6953, #F7AC2F, #34CCBB, #339882, #3F80D9, #6454C9 ];
  //
  //   var results = [];
  //
  //   for(var color in colors){
  //
  //   }
  // }

  render () {
      return (
        <div id="category-create">
          <div className="row-createcategory">
            <i className="fa fa-2x fa-times exit-icon" aria-hidden="true" onClick={this.closeCreate.bind(this)}></i>
          </div>
          <div className="row-createcategory">
            <p id="label-newtag">new tag:</p>
            <div id="new-cat-entry">
                <input type="text" className="login-form form-control" id="input-newcat" onChange={this.logNewCatTitle.bind(this)}/>
                <div className="row-createcategory">
                  <p id="text-choose-color">choose color:</p>
                </div>
                <div className="row-createcategory category-create-btns" id="color-swatch-row">
                  {this.getColors()}
                </div>
                <div className="row-createcategory category-create-btns" >
                  <div className="btn-new-cat" id="btn-new-cat-cancel" onClick={this.closeCreate.bind(this)}>cancel</div>
                  <div className="btn-new-cat" id="btn-new-cat-save" onClick={this.addNewCategory.bind(this)}>save</div>
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
    categories : state.categories
})

let mapDispatchToProps = (dispatch) => {
  return {
    popup_actions : bindActionCreators(PopupActions, dispatch),
    category_actions : bindActionCreators(CategoryActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryCreator);
