import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import CategoryBubble from '../SideBar/CategoryBubble.js';
import CategoryBar from '../Bars/CategoryBar.js'


function getState(){
  return{
    pageTitle: ""
  }
}

class TagSelection extends Component{
  constructor(props){
    super(props);
    this.state = getState();
  }

  componentDidMount(){
    console.log("props", this.props);
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
    console.log("editing page title", event.target.value);
    document.getElementById("edit-icon").style.display='block';
    this.setState({
      pageTitle: event.target.value
    });
  }

  enterSearch(event){
    console.log("entering search", event.target.value);
  }

  submitSearch(event){
    var keycode = event.keyCode || event.which;
    if(keycode == '13') {
      console.log("ENTERING SEARCH");
    }
  }

  getCategoryBars(cat_keys) {
    //CHECK THE check
    //          var checked = (key in currentPageCategories);
    let result = [];
    var currentPageCategories = this.props.currentPage.categories;
    var categories = this.props.categories.cats;

    for( var key in cat_keys){
      var index = cat_keys[key];
      var checked = (index in currentPageCategories);
      result.push(<CategoryBar categoryInfo={categories[index]} checked={checked} key={categories[index].title}/>)
    }
    return result;
    // return <CategoryBar categoryInfo={category} checked={checked} key={category.title}/>;
  }

  // newCategoryRow(){
  //   <div classname="row" id="category-row">
  // }

  endBracket(){
    return <div></div>;
  }

  // getCategories(){
  //
  // }

  getRow(cat_keys){
    return(
      <div classname="row" id="category-row">
        {this.getCategoryBars(cat_keys)}
      </div>
    )
  }

  getCategories(){
    var padding_pixels = 42;
    var box_width = 270;
    var max_rows = 4;

    var curr_row_pixels = 0;
    var curr_total_rows = 1;

    var curr_row_cat_num = [];
    var categories = this.props.categories.cats;
    let result = [];

    if (categories != null) {
      for(var key in categories) {
        var cat_length = (categories[key].title.length * 6) + padding_pixels;
        if((curr_row_pixels + cat_length) < box_width){
          curr_row_cat_num.push(key);
          curr_row_pixels += cat_length;
          console.log("title", categories[key].title);
          console.log("word length", categories[key].title.length);
          console.log("cat_length", cat_length);
          console.log("curr_row_pixels", curr_row_pixels);
        }else if(curr_total_rows < (max_rows + 1)){
          console.log("pushing this array", curr_row_cat_num);
          result.push(this.getRow(curr_row_cat_num));
          curr_row_cat_num = [];
          curr_row_cat_num.push(key);
          curr_total_rows++;
          curr_row_pixels = cat_length;
        }else{
          break;
        }
      }
    }else{
      return <div> Create a category to add to the page </div>;
    }
    result.push(this.getRow(curr_row_cat_num));
    return result;

  }

  oldgetCategories(){
    //#TODO gam- put all the current selected categories first
    var padding_pixels = 42;
    var box_width = 270;
    var max_rows = 4;

    var curr_row_pixels = 0;
    var curr_total_rows = 1;
    console.log("categories", this.props.categories.cats);
    var categories = this.props.categories.cats;
    //need to know how long this is, then know if you can add it

    if (categories != null) {
      let result = []
      var curr_row = [];
      // var curr_row = <div classname="row" id="category-row">;
      var currentPageCategories = this.props.currentPage.categories;

      // result.push(<div classname="row" id="category-row">;);
      for(var key in categories) {
        var cat_length = (categories[key].title.length * 3) + padding_pixels;
        //check not over the row count, nor the pixel count

        if((curr_row_pixels + cat_length) < box_width){
          var checked = (key in currentPageCategories);
          curr_row.push(this.getCategoryBar(categories[key], checked));
          //result.push(this.getCategoryBar(categories[key], checked));
          curr_row_pixels += curr_row_pixels + cat_length;

        }else if(curr_total_rows < (max_rows + 1)){
          // curr_row += </div>;
          result.push(<div> + curr_row + </div>);
          // result.push(</div><div classname="row" id="category-row">;);
          // curr_row = </div><div classname="row" id="category-row">;
          var checked = (key in currentPageCategories);
          result.push(this.getCategoryBar(categories[key], checked));
          curr_total_rows += 1;
          curr_row_pixels = cat_length;
        }else{
          break;
        }
      }
      // curr_row += </div>;
      result.push(<div> + curr_row + </div>);
      // result.push(this.endBracket());
      return(result);
    }
    else{
      return <div>you have not made any categories yet</div>;
    }
  }

  render(){
    // <CategoryBar categoryInfo={this.props.categories.cats[39]} checked="true" key={this.props.categories.cats[39].title}/>

    return(
      <div id="tag-selection-wrapper">
          <div className="row" id="row-url-entry">
            <img id="favicon-url-entry" src={this.props.currentPage.favIconUrl} />
            <input type="text" className="login-form form-control sidebar-form" id="title-url-entry" defaultValue={this.props.currentPage.title} onMouseOver={this.hoverOnTitle.bind(this)} onMouseLeave={this.leaveHoverOnTitle.bind(this)} onChange={this.editPageTitle.bind(this)}/>
            <i id="edit-icon" className="fa fa-2x fa-pencil-square-o" aria-hidden="true" style={{display:"none"}}></i>
          </div>
          <div className="row" id="row-searchbar">
            <input type="text" className="sidebar-form login-form form-control" id="searchbar" onChange={this.enterSearch.bind(this)} onKeyPress={this.submitSearch.bind(this)}/>
            <i id="search-icon" className="fa fa-2x fa-search" aria-hidden="true"></i>
          </div>
          <div id="categories-wrapper">
            {this.getCategories()}

          </div>
      </div>
    );
  }

}

let mapStateToProps = (state) => ({
  currentPage : state.currentPage,
  categories: state.categories,
  currentUser : state.currentUser
})

let mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagSelection);
