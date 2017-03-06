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

  getCategoryBar(category, checked) {
    return <CategoryBar categoryInfo={category} checked={checked} key={category.title}/>;
  }

  getCategories() {
    var categories = this.props.categories.cats;
    if (categories != null && Object.keys(categories).length) {
      let result = []
      var currentPageCategories = this.props.currentPage.categories;
      for(var key in categories) {
        var checked = (key in currentPageCategories);
        result.push(this.getCategoryBar(categories[key], checked));
      }
      return result.slice(this.state.startIndex, this.state.endIndex);
    }
  }

  incrementPage(){
    if (this.props.numCats > this.state.endIndex + 1) {
      var newStartIndex = this.state.endIndex + 1;
      var newEndIndex = this.state.endIndex + GlobalConstants.MAX_DISPLAY_CATS + 1;
      if (newEndIndex > this.props.numCats) {
        newEndIndex = this.props.numCats;
      }
      console.log(newStartIndex, newEndIndex);
      this.setState({startIndex: newStartIndex, endIndex: newEndIndex});
    }
  }

  decrementPage(){
    if (this.state.startIndex > 0) {
      var newStartIndex = this.state.startIndex - GlobalConstants.MAX_DISPLAY_CATS - 1;
      var newEndIndex = newStartIndex + GlobalConstants.MAX_DISPLAY_CATS;
      if (newEndIndex > this.props.numCats) {
        newEndIndex = this.props.numCats;
      }
      console.log(newStartIndex, newEndIndex);
      this.setState({startIndex: newStartIndex, endIndex: newEndIndex});
    }
  }


  render() {
    return (
      <div className='paginate-cats'>
        <div className="change-page-btn" onClick={()=> {this.decrementPage()}}>
          <i className="fa fa-angle-left fa-3x arrow-btn" aria-hidden="true"></i>
        </div>
        <div className ='categories-container'>
          {this.getCategories()}
        </div>
        <div className="change-page-btn" onClick={()=> {this.incrementPage()}}>
          <i className="fa fa-angle-right fa-3x arrow-btn" aria-hidden="true"></i>
        </div>
      </div>
    )
  };
}

let mapStateToProps = (state) => ({
    currentPage : state.currentPage,
    currentUser : state.currentUser,
    categories: state.categories,
})

export default connect(mapStateToProps, null)(CategoriesContainer);
