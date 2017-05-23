import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';
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
    console.log("BAR props", this.props);
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
    return (
      <div
        style={{"backgroundColor" : this.state.backgroundColor , "color": this.state.textColor , "border" : "solid 2px " + this.state.lineColor}}
        className='category-bar hide-overflow'
        id={this.props.categoryInfo.title}
        onClick={() => {
          this.props.category_actions.toggleCategory( this.props.currentPage.url, this.props.categoryInfo, !this.props.checked, this.props.currentUser.token);
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
    currentUser : state.currentUser
})

let mapDispatchToProps = (dispatch) => ({
  category_actions: bindActionCreators(CategoryActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryBar);
