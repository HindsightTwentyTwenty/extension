import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';
import * as NavActions from '../../actions/App/NavActions.js'
var classNames = require('classnames');

function getState(){
  return{
    backgroundColor:"#FAFAFA",
    lineColor:"#FAFAFA",
    textColor:"#FAFAFA"
  }
}


class CategoryBar extends Component {

  constructor(props) {
    super(props);
    this.categoryInfo = this.props.categoryInfo;
    this.state = getState();
  }

  componentDidMount(){
    if(this.props.checked){
      this.fillButton();
    }else{
      this.outlineButton();
    }
  }

  fillButton(){
    this.setState({
      backgroundColor:this.props.categoryInfo.color,
      lineColor:this.props.categoryInfo.color,
      textColor:"#FAFAFA"
    });
  }

  outlineButton(){
    this.setState({
      backgroundColor:"#FAFAFA",
      lineColor:this.props.categoryInfo.color,
      textColor:this.props.categoryInfo.color
    });
  }

  /* fill button on hover, outline button on leaving hover, with the current color */
  hoverOnButton(){
    if(!this.props.checked){
      this.fillButton();
    }
  }

  exitHoverOnButton(){
    if(!this.props.checked){
      this.outlineButton();
    }
  }

  render() {
    var lineStyle = this.props.appNav.categoriesView == "edit-select" ? "dotted 2px " : "solid 2px ";
    return (
      <div
        style={{"backgroundColor" : this.state.backgroundColor , "color": this.state.textColor , "border" : lineStyle + this.state.lineColor}}
        className='category-bar hide-overflow'
        id={this.props.categoryInfo.title}
        onClick={() => {
          if(this.props.appNav.categoriesView == "edit-select"){
            this.props.nav_actions.switchCategoryView("edit");
            this.props.nav_actions.setEditCat(this.props.categoryInfo.pk);
          }else{
            this.props.onSelect(this.props.currentPage.url, this.props.categoryInfo, !this.props.checked, this.props.currentUser.token);
          }
        }}
        onMouseOver={this.hoverOnButton.bind(this)}
        onMouseLeave={this.exitHoverOnButton.bind(this)}
        >
        {this.props.categoryInfo.title}
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    currentPage : state.currentPage,
    currentUser : state.currentUser,
    appNav : state.appNav,
    currentSearchCategories : state.currentSearchCategories
})

let mapDispatchToProps = (dispatch) => ({
  category_actions: bindActionCreators(CategoryActions, dispatch),
  nav_actions: bindActionCreators(NavActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryBar);
