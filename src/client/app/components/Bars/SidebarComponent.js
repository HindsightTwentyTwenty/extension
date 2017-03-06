import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import SidebarCategoryBar from './SidebarCategoryBar';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';
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
    this.props.category_actions.pushCategory(categoryTitle,
      this.state.editColor, this.props.currentUser.token);
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
    var currentSearchCategories = this.props.currentSearchCategories.searchCats;
    var allCategories = this.props.categories.cats;
    if (Object.keys(allCategories).length) {
      let result = [];
      let searchCategorySet = new Set(currentSearchCategories);
      for (var key in allCategories) {
        var checked = searchCategorySet.has(allCategories[key].title);
        result.push(<SidebarCategoryBar categoryInfo={allCategories[key]} checked={checked} key={allCategories[key].title}/>)
      }
      return result
    }
  }

  render() {
    var categories = this.getCategories();
    var showStarredStyle = this.props.categoriesAndPages.showStarred ? {"fontWeight" : "bold"} : {};
    var starClass = this.props.categoriesAndPages.showStarred ? 'fa fa-star side-bar-single-button selected' : 'fa fa-star side-bar-single-button';
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
  currentSearchCategories : state.currentSearchCategories,
  currentUser : state.currentUser,
  categories: state.categories,
  categoriesAndPages: state.categoriesAndPages
})

let mapDispatchToProps = (dispatch) => ({
  category_actions: bindActionCreators(CategoryActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarComponent);
