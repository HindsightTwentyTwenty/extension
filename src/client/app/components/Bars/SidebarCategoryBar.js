import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as SearchCategoriesActions from '../../actions/SearchCategories/SearchCategoriesActions.js';
import * as CategoriesPagesActions from '../../actions/CategoriesPages/CategoriesPagesActions.js';
import * as GlobalConstants from '../../constants/GlobalConstants.js';

function getState(){
  return{
    checked: false,
    color: "",
    confirmDelete: false,
    editCat: false,
    editColor: "",
    title: ""
  }
}

class SidebarCategoryBar extends Component {

  constructor(props) {
    super(props);
    this.state = getState();
  }

  componentWillMount() {
    this.updateCategoryState()
  }

  componentWillReceiveProps() {
    this.updateCategoryState();
  }

  updateCategoryState() {
    var category = this.props.categoriesAndPages.categories[this.props.pk];
    this.setState({
      editColor: category.color,
      title: category.title,
      color: category.color
    })
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

  getColors() {
    return GlobalConstants.CAT_COLORS.map((color) => {
      return <div className='color-square-small'
      onClick={this.changeEditColor.bind(this, color.code)}
      style={{"backgroundColor" : color.code}}
      key={color.name}></div>
    });
  }

  getCategoryTitle() {
    var categoryTitle = this.state.title;
    var categoryColor = this.state.color;
    var checkedTitleStyle = this.state.checked ? {"color" : categoryColor, "fontWeight" : "bold"} : {};
    var checkedBoxStyle = this.state.checked ? {"backgroundColor" : categoryColor, "opacity" : "1"} : {"backgroundColor" : categoryColor, "opacity" : "0.5"};
    var barClassName = this.state.checked ? 'side-bar-category checked' : 'side-bar-category';
    return (
      <div className={barClassName}>
        <div className='category-info' onClick={() => {
          var updateChecked = !this.state.checked;
          this.props.search_categories_actions.toggleSearchCategory(this.props.pk, updateChecked);
          this.setState({checked: updateChecked})
          }}>
          <div className='color-square-small' style={checkedBoxStyle}/>
          <div className='category-title hide-overflow'
            style={checkedTitleStyle}>
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
    var categoryTitle = this.state.title;
    var userToken = this.props.currentUser.token;
    return(
      <div className='side-bar-category'>
        <div className='category-title'>
          are you sure?
        </div>
        <div className='side-bar-buttons'>
          <a onClick={() => {
            this.props.search_categories_actions.toggleSearchCategory(this.props.pk, false);
            this.props.categories_pages_actions.deleteCategory(this.props.pk, categoryTitle, userToken);
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

  getEditCategory() {
    var categoryTitle = this.state.title;
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
              var categoryTitles = new Set();
              (Object.keys(this.props.categoriesAndPages.categories)).map(function(pk) {
                categoryTitles.add(this.props.categoriesAndPages.categories[pk].title);
              }, this);
              if (input == categoryTitle && this.state.color == this.state.editColor) {
                this.toggleEditStatus(false);
              } else if (input == categoryTitle && this.state.color != this.state.editColor) {
                this.props.categories_pages_actions.editCategory(this.props.pk, categoryTitle, input, this.state.editColor, userToken);
                this.toggleEditStatus(false);
              } else if (categoryTitles.has(input)) {
                alert("Category name already exists!");
              } else {
                this.props.categories_pages_actions.editCategory(this.props.pk, categoryTitle, input, this.state.editColor, userToken);
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
  categoriesAndPages : state.categoriesAndPages,
  currentUser : state.currentUser
})

let mapDispatchToProps = (dispatch) => ({
  search_categories_actions: bindActionCreators(SearchCategoriesActions, dispatch),
  categories_pages_actions: bindActionCreators(CategoriesPagesActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarCategoryBar);
