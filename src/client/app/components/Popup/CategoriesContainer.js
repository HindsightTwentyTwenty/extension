import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as GlobalConstants from '../../constants/GlobalConstants.js';
import CategoryBar from '../Bars/CategoryBar';
import CategoryCreator from '../SideBar/CategoryCreator.js'
import * as NavActions from '../../actions/App/NavActions.js';


function getState(){
  return{
    startIndex: 0,
    endIndex: 0
  }
}

class CategoriesContainer extends Component {

  constructor(props) {
    super(props);
    this.state = getState();
  }

  componentWillMount() {
    var totalCategories = this.props.numCats;
    var newEndIndex = GlobalConstants.MAX_DISPLAY_CATS > totalCategories ? totalCategories : GlobalConstants.MAX_DISPLAY_CATS;
    this.setState({
      endIndex: newEndIndex
    })
  }

  componentWillUpdate() {
    if(this.state.startIndex + GlobalConstants.MAX_DISPLAY_CATS >= this.props.numCats
      && this.state.endIndex != this.props.numCats){
      this.setState({endIndex: this.props.numCats});
    }
  }

  getCategoryBar(category, checked) {
    return <CategoryBar categoryInfo={category} checked={checked} key={category.title} onSelect={this.props.onSelect}/>;
  }

  getCategories() {
    var categories = this.props.categories.cats;
    if (categories != null && this.props.numCats) {
      let result = [];
      for(var key in categories) {
        if(this.props.useCase === "search" && this.props.currentSearchCategories.searchCats.size > 0){
          var checked = this.props.currentSearchCategories.searchCats.has(categories[key].title);
        }
        result.push(this.getCategoryBar(categories[key], checked));
      }
      return result.slice(this.state.startIndex, this.state.endIndex);
    }
  }

  incrementPage(){
    if (this.props.numCats > this.state.endIndex) {
      var newStartIndex = this.state.endIndex;
      var newEndIndex = this.state.endIndex + GlobalConstants.MAX_DISPLAY_CATS;
      if (newEndIndex > this.props.numCats) {
        newEndIndex = this.props.numCats;
      }
      this.setState({startIndex: newStartIndex, endIndex: newEndIndex});
    }
  }

  decrementPage(){
    if (this.state.startIndex >= GlobalConstants.MAX_DISPLAY_CATS) {
      var newStartIndex = this.state.startIndex - GlobalConstants.MAX_DISPLAY_CATS;
      var newEndIndex = newStartIndex + GlobalConstants.MAX_DISPLAY_CATS;
      if (newEndIndex > this.props.numCats) {
        newEndIndex = this.props.numCats;
      }
      this.setState({startIndex: newStartIndex, endIndex: newEndIndex});
    }
  }

  render() {
    var leftArrowClass = this.state.startIndex == 0 ? <div className='change-page-btn'><i className='fa fa-angle-left fa-3x arrow-btn-disabled' aria-hidden="true"></i></div> : <div className="change-page-btn" onClick={()=> {this.decrementPage()}}><i className='fa fa-angle-left fa-3x arrow-btn' aria-hidden="true"></i></div>
    var rightArrowClass = this.state.endIndex == this.props.numCats ? <div className='change-page-btn'><i className='fa fa-angle-right fa-3x arrow-btn-disabled' aria-hidden="true"></i></div> : <div className="change-page-btn" onClick={()=> {this.incrementPage()}}><i className='fa fa-angle-right fa-3x arrow-btn' aria-hidden="true"></i></div>;
    var editButtonStyle = this.props.appNav.categoriesView == "edit-select" ? {"color": '#fafafa', "backgroundColor": '#55524D'} : {};
    return (
      <div className="categories-container-wrapper">
        <div className='paginate-cats'>
          {leftArrowClass}
          <div className ='categories-container'>
            {this.getCategories()}
          </div>
          {rightArrowClass}
        </div>
        <div className="row" id="row-tag-bottom">
          <div className="cat-button" onClick={()=> {this.props.nav_actions.switchCategoryView("create")}}>
            <i className="fa fa-plus" aria-hidden="true"></i>
          </div>
          <div className="cat-button" style={editButtonStyle} onClick={()=> {
            if(this.props.appNav.categoriesView == "select"){
              this.props.nav_actions.switchCategoryView("edit-select");
            }else{
              this.props.nav_actions.switchCategoryView("select");
            }}}>
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    )
  };
}

let mapStateToProps = (state) => ({
    currentPage : state.currentPage,
    currentUser : state.currentUser,
    categories: state.popupCategories,
    currentSearchCategories : state.currentSearchCategories,
    appNav: state.appNav
})

let mapDispatchToProps = (dispatch) => ({
  nav_actions: bindActionCreators(NavActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesContainer);
