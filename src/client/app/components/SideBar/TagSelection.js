import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import Select from 'react-select';
import ReactTooltip from 'react-tooltip';
import Toggle from 'react-toggle'
import 'react-toggle/style.css';


import CategoryBar from '../Bars/CategoryBar.js'
import CategoryCreator from '../SideBar/CategoryCreator.js'
import * as LookbackActions from '../../actions/App/LookbackActions.js';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';
import * as PopupActions from '../../actions/Popup/PopupActions.js';
import * as UserActions from '../../actions/User/UserActions.js';



function getState(){
  return{
    pageTitle: "",
    category_selection: "",
    create_selected: false
  }
}

class TagSelection extends Component{
  constructor(props){
    super(props);
    this.state = getState();
  }

  componentDidMount(){
    console.log("TAG SELECTION props", this.props);
    this.setState({
      pageTitle:this.props.currentPage.title
    })
  }

  hoverOnTitle(){
    document.getElementById("edit-icon").style.display='block';
  }

  leaveHoverOnTitle(){
    document.getElementById("edit-icon").style.display='none';
  }

  editPageTitle(event){
    document.getElementById("edit-icon").style.display='block';
    this.setState({
      pageTitle: event.target.value
    });
  }

  submitSearch(event){
    var keycode = event.keyCode || event.which;
    if(keycode == '13') {
      var search_term = event.target.value;
      if(event.target.value.trim() != ""){
        this.props.lookback_actions.clearSearchResults();
        this.props.lookback_actions.searchTerm(search_term, moment(this.state.start_date).tz("UTC").format(), moment(this.state.end_date).tz("UTC").format(), "", "", this.props.currentUser.token);
      }
    }
  }

  /* get each of the little category labels */
  getCategoryBars(cat_keys) {
    let result = [];
    var currentPageCategories = this.props.currentPage.categories;
    var categories = this.props.categories.cats;

    for( var key in cat_keys){
      var index = cat_keys[key];
      var checked = false
      for(var key in currentPageCategories){
        if (categories[index].title == currentPageCategories[key].title){
          checked = true;
        }
      }
      result.push(<CategoryBar categoryInfo={categories[index]} checked={checked} key={categories[index].title} id={categories[index].title} onSelect={this.props.category_actions.toggleCategory}/>)
    }
    return result;
  }


  getCategories(){
    var padding_pixels = 42;
    var box_width = (320 * 4);
    var curr_row_pixels = 0;


    var curr_row_cat_num = [];
    var categories = this.props.categories.cats;
    let result = [];

    if (this.props.categories && categories != null) {
      for(var key in categories) {
        var cat_length = (categories[key].title.length * 6) + padding_pixels;
        if((curr_row_pixels + cat_length) < box_width){
          curr_row_cat_num.push(key);
          curr_row_pixels += cat_length;
        }else{
          break;
        }
      }
    }else{
      return <div> Create a category to add to the page </div>;
    }
    result.push(this.getCategoryBars(curr_row_cat_num));
    return result;

  }

    getCategoryOptions() {
      var options = [];

      Object.keys(this.props.categories.cats).map(function(pk) {
        var category = this.props.categories.cats[pk];
        options.push({ value: category.title, label: category.title })
      }, this);
      return options;
    }

    addNewCategory(categoryTitle){
      for (var key in this.props.categories.cats) {
        if (categoryTitle == this.props.categories.cats[key].title) {
          this.props.category_actions.toggleCategory(this.props.currentPage.url,
            this.props.categories.cats[key], true, this.props.currentUser.token, this.props.currentPage.title,);
          document.getElementById(this.props.categories.cats[key].title).checked = true;
          break;
        }
      }
    }

    handleCategoryChange(category_option) {
      var category_title = "";
      if(category_option){
        category_title = category_option.value;
        this.addNewCategory(category_title);
      }
    }

  createNewCategory(){
    this.props.popup_actions.changePopupCatState("create");
  }

  toggleChange(event) {
    this.props.user_actions.toggleTracking(event.target.checked, this.props.currentUser.token);
  }

  getCategoryContent(){
    if(this.props.cat_state == "create"){
      return(
        <div>
          <CategoryCreator onClose={this.props.popup_actions.changePopupCatState} />
        </div>
      )
    }else if(this.props.categories.cats){
      return(
        <div>
          <div className="category-select">
            <Select
              name="sidebar-form"
              value={ this.state.category_selection }
              options={ this.getCategoryOptions() }
              onChange={ this.handleCategoryChange.bind(this)}
              noResultsText= "no results found"
              placeholder="find tag"
            />
          </div>
          <div id="categories-wrapper">
            {this.getCategories()}
          </div>
          <div className="row" id="row-tag-bottom" >
              <div id="tracking-toggle-wrapper">
                <ReactTooltip place="left" effect="solid" />
                <i className="fa fa-question-circle fa-lg"
                   id="tracking-explanation"
                   data-tip="Keep on to save browsing history" aria-hidden="true"></i>
                <span id="tracking-toggle-label">Autosave: </span>
                <Toggle id="tracking-toggle"
                  onChange={ this.toggleChange.bind(this) }
                  className={ "popup-tracking-toggle"}
                  checked={ this.props.currentUser.tracking_on }/>
              </div>
              <div className="cat-button" id="popup-cat-button" onClick={this.createNewCategory.bind(this)}>
              <i className="fa fa-plus" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      )
    }
  }

  getTitle(){
    /*TODO- gam, title edit         return(    <input type="text" className="login-form form-control sidebar-form" id="title-url-entry" defaultValue={this.props.currentPage.title} onMouseOver={this.hoverOnTitle.bind(this)} onMouseLeave={this.leaveHoverOnTitle.bind(this)} onChange={this.editPageTitle.bind(this)}/> */
    if(this.props.currentPage.title){
      return <div id="title-url-entry" >{this.props.currentPage.title}</div>
    }else{
      return(
        <div>Loading..</div>
      )
    }
  }

  render(){
    return(
      <div id="tag-selection-wrapper">
          <div className="row" id="row-url-entry">
            <img id="favicon-url-entry" src={this.props.currentPage.favIconUrl} />
            {this.getTitle()}
            <i id="edit-icon" className="fa fa-2x fa-pencil-square-o" aria-hidden="true" style={{display:"none"}}></i>
          </div>
          {this.getCategoryContent()}
      </div>
    );
  }

}

let mapStateToProps = (state) => ({
  currentPage : state.currentPage,
  categories: state.popupCategories,
  currentUser : state.currentUser,
  cat_state : state.popupSelection.cat_state
})

let mapDispatchToProps = (dispatch) => {
  return {
    lookback_actions: bindActionCreators(LookbackActions, dispatch),
    category_actions: bindActionCreators(CategoryActions, dispatch),
    popup_actions: bindActionCreators(PopupActions, dispatch),
    user_actions: bindActionCreators(UserActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagSelection);
