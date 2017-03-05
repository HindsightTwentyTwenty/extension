import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';
import * as GlobalConstants from '../../constants/GlobalConstants.js';

function getState(){
  return{
    editColor:"",
    confirmDelete: false,
    editCat: false
  }
}

class SidebarCategoryBar extends Component {

  constructor(props) {
    super(props);
    this.state = getState();
  }

  componentWillReceiveProps() {
    this.setState({
      editColor:this.props.categoryInfo.color
    })
  }

  getCategoryTitle() {
    var categoryTitle = this.props.categoryInfo.title;
    var categoryColor = this.props.categoryInfo.color;
    var checkedTitleStyle = this.props.checked ? {"color" : categoryColor, "fontWeight" : "bold"} : {};
    var checkedBoxStyle = this.props.checked ? {"backgroundColor" : categoryColor, "opacity" : "1"} : {"backgroundColor" : categoryColor, "opacity" : "0.5"};
    var barClassName = this.props.checked ? 'side-bar-category checked' : 'side-bar-category';
    return (
      <div className={barClassName}>
        <div className='category-info'>
          <div className='color-square-small' style={checkedBoxStyle}/>
          <div className='category-title'
            style={checkedTitleStyle}
            onClick={() => {
              this.props.category_actions.updateSearchCategory(categoryTitle, !this.props.checked);
            }}>
            {categoryTitle}
          </div>
        </div>
        <div className='side-bar-buttons'>
          <a onClick={() => {this.toggleEditStatus(true);}}>
            <i className='fa fa-pencil left-sidebar-button'/>
          </a>
          <a onClick={() => {this.toggleDeleteStatus(true)}}>
            <i className='fa fa-trash right-sidebar-button'/>
          </a>
        </div>
      </div>
    );
  }

  getDeleteCategory() {
    var categoryTitle = this.props.categoryInfo.title;
    var userToken = this.props.currentUser.token;
    return(
      <div className='side-bar-category'>
        <div className='category-title'>
          are you sure?
        </div>
        <div className='side-bar-buttons'>
          <a onClick={() => {
            this.props.category_actions.updateSearchCategory(categoryTitle, false);
            this.props.category_actions.deleteCategory(categoryTitle, userToken);
          }}>
            <i className='fa fa-check left-sidebar-button'/>
          </a>
          <a onClick={() => {
            this.toggleDeleteStatus(false);
          }}>
            <i className='fa fa-times right-sidebar-button'/>
          </a>
        </div>
      </div>
    )
  }

  getColors() {
    return GlobalConstants.CAT_COLORS.map((color) => {
      return <div className='color-square-small'
      onClick={this.changeEditColor.bind(this, color.code)}
      style={{"backgroundColor" : color.code}}
      key={color.name}></div>
    });
  }

  toggleDeleteStatus(deleteStatus) {
    this.setState({
      confirmDelete: deleteStatus
    });
  }

  toggleEditStatus(editStatus) {
    this.setState({
      editCat: editStatus
    });
  }

  changeEditColor(color) {
    this.setState({
      editColor: color
    });
  }

  getEditCategory() {
    var categoryTitle = this.props.categoryInfo.title;
    var categoryColor = this.state.editColor;
    var userToken = this.props.currentUser.token;
    return (
      <div>
        <div className='side-bar-category'>
          <div className='category-info'>
            <div className='color-square-small' style={{"backgroundColor" : categoryColor}}/>
            <input className='edit-category-input' defaultValue={categoryTitle}
              ref={node => {this.input = node;}}
            />
          </div>
          <div className='side-bar-buttons'>
            <a onClick={() => {
              var input = this.input.value.trim();
              var categoriesSet = new Set(Object.keys(this.props.categories.cats));
              if (input == categoryTitle && this.props.categoryInfo.color == this.state.editColor) {
                this.toggleEditStatus(false);
              } else if (input == categoryTitle && this.props.categoryInfo.color != this.state.editColor) {
                this.props.category_actions.editCategory(categoryTitle, input, this.state.editColor, userToken);
                this.toggleEditStatus(false);
              } else if (categoriesSet.has(input)) {
                alert("Category name already exists!");
              } else {
                this.props.category_actions.editCategory(categoryTitle, input, this.state.editColor, userToken);
                this.toggleEditStatus(false);
              }
            }}>
              <i className='fa fa-check left-sidebar-button'/>
            </a>
            <a onClick={() => {
              this.toggleEditStatus(false);
            }}>
              <i className='fa fa-times right-sidebar-button'/>
            </a>
          </div>
        </div>
        <div className='side-bar-color-picker'>
          {this.getColors()}
        </div>
      </div>
    );
  }

  render() {
    if (this.state.editCat) {
      return this.getEditCategory();
    } else if (this.state.confirmDelete) {
      return this.getDeleteCategory();
    } else {
      return this.getCategoryTitle();
    }
  }
}

let mapStateToProps = (state) => ({
  categories : state.categories,
  currentUser : state.currentUser
})

let mapDispatchToProps = (dispatch) => ({
  category_actions: bindActionCreators(CategoryActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarCategoryBar);
