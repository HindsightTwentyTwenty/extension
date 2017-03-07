import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import SidebarCategoryBar from './SidebarCategoryBar';
import * as CategoriesPagesActions from '../../actions/CategoriesPages/CategoriesPagesActions.js';
import * as GlobalConstants from '../../constants/GlobalConstants.js';

function getState(){
  return{
    editColor: GlobalConstants.DEFAULT_CAT_COLOR.code,
    showColorPicker: false
  }
}

class SidebarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = getState();
  }

  addNewCategory(categoryTitle){
    // this.props.category_actions.pushCategory(categoryTitle,
    //   this.state.editColor, this.props.currentUser.token);
  }

  keyPressed(event){
    var keycode = event.keyCode || event.which;
    if(keycode == '13') {
      var inputValue = this.input.value.trim();
      if (inputValue !== '') {
        this.addNewCategory(inputValue);
        this.input.value = '';
      }
    }
  }

  toggleColorPicker() {
    this.setState({
      showColorPicker: !this.state.showColorPicker
    });
  }

  changeEditColor(color) {
    this.setState({
      editColor: color
    });
  }

  showEditCatColorPicker() {
    if (this.state.showColorPicker) {
      return GlobalConstants.CAT_COLORS.map((color) => {
        return <div className='color-square-small'
        onClick={this.changeEditColor.bind(this, color.code)}
        style={{"backgroundColor" : color.code}}
        key={color.name}></div>
      });
    }
  }

  getCategories() {
    var categories = this.props.categoriesAndPages.categories;
    if (Object.keys(categories).length) {
      let result = [];
      for (let catPk in categories) {
        result.push(<SidebarCategoryBar pk={catPk} key={catPk}/>)
      }
      return result
    }
  }

  render() {
    var categories = this.getCategories();
    var showStarredStyle = this.props.searchCategories.showStarred ? {"fontWeight" : "bold"} : {};
    var starClass = this.props.searchCategories.showStarred ? 'fa fa-star side-bar-single-button selected' : 'fa fa-star side-bar-single-button';
    var editColor = {"backgroundColor" : this.state.editColor};
    return (
      <div className="side-bar-container">
        <div className="side-bar-header">
          <div className='side-bar-category' onClick={() => {
            this.props.category_actions.clearSearchCategories();
            if (this.props.categoriesAndPages.showStarred) {
              this.props.category_actions.toggleShowStarred();
            }
          }}>
            <div className='category-info'>
              <i className='fa fa-times side-bar-single-button'/>
              <div className='category-title'>
                clear selection
              </div>
            </div>
          </div>
          <div className='side-bar-category' onClick={() => {
            this.props.category_actions.toggleShowStarred();
          }}>
            <div className='category-info'>
              <i className={starClass}/>
              <div className='category-title'
                style={showStarredStyle}>
                show starred
              </div>
            </div>
          </div>
          <div className='side-bar-category'>
            <div className='category-info'>
              <div className='color-square-small' style={editColor} onClick={() => {
                this.toggleColorPicker();
              }}/>
              <div className='category-title'>
                <input type="text" className="side-bar-input" placeholder="add category" onKeyPress={this.keyPressed.bind(this)} ref={node => {
                  this.input = node;
                }}/>
              </div>
            </div>
            <i className='fa fa-plus side-bar-single-button'onClick={() => {
              var inputValue = this.input.value.trim();
              if (inputValue !== '') {
                this.addNewCategory(inputValue);
                this.input.value = '';
              }
            }}/>
          </div>
        </div>
        <div className='side-bar-color-picker'>
          {this.showEditCatColorPicker()}
        </div>
        <div className="all-categories">{categories}</div>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  currentUser : state.currentUser,
  categoriesAndPages: state.categoriesAndPages,
  searchCategories: state.searchCategories
})

let mapDispatchToProps = (dispatch) => ({
  categories_pages_actions: bindActionCreators(CategoriesPagesActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarComponent);
