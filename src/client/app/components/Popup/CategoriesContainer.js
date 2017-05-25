import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as GlobalConstants from '../../constants/GlobalConstants.js';
import CategoryBar from '../Bars/CategoryBar';

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
        if(this.props.useCase === "search"){
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
    var rightArrowClassName = this.state.startIndex == 0 ? 'fa fa-angle-left fa-3x arrow-btn' : 'fa fa-angle-left fa-3x arrow-btn';
    return (
      <div className="categories-container-wrapper">
        <div className='paginate-cats'>
          <div className='change-page-btn' onClick={()=> {this.decrementPage()}}>
            <i className={rightArrowClassName} aria-hidden="true"></i>
          </div>
          <div className ='categories-container'>
            {this.getCategories()}
          </div>
          <div className="change-page-btn" onClick={()=> {this.incrementPage()}}>
            <i className="fa fa-angle-right fa-3x arrow-btn" aria-hidden="true"></i>
          </div>
        </div>
        <p className="text-center">Showing categories {this.state.startIndex+1} through {this.state.endIndex} of {this.props.numCats}</p>
      </div>
    )
  };
}

let mapStateToProps = (state) => ({
    currentPage : state.currentPage,
    currentUser : state.currentUser,
    categories: state.categories,
    currentSearchCategories : state.currentSearchCategories
})

export default connect(mapStateToProps, null)(CategoriesContainer);
