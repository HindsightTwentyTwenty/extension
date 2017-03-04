import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as LookbackActions from '../../actions/App/LookbackActions.js';
import * as StarActions from '../../actions/Star/StarActions.js';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';
import * as GlobalConstants from '../../constants/GlobalConstants.js';
import Loading from '../Popup/Loading.js';
const Timestamp = require('react-timestamp');

function getState() {
  return {
    iframe_show:false,
    iframehider_show:false,
    editColor: GlobalConstants.DEFAULT_CAT_COLOR.code
  }
}

class PageUrlBar extends Component {

  constructor(props) {
    super(props);
    this.state = getState();
  }

  //WC SPRING TODO: REWORK TO USE CATEGORY ENTRY COMPONENT, JUST CHANGE CSS
  addNewCategory(categoryTitle){
      this.props.category_actions.pushCategory(categoryTitle, this.state.editColor, this.props.currentUser.token).then(() => {
        var categoryObject;
        var categories = this.props.categories.cats;
        for(var i = categories.length-1; i >= 0; i--){
          if(categories[i].title == categoryTitle){
            categoryObject = categories[i];
            break;
          }
        }
        if (categoryObject) {
          console.log(this);
          this.props.category_actions.toggleCategory(this.props.page.url, categoryObject, true, this.props.currentUser.token);
        }
    });
  }

  getCategoryEntry() {
    return (
      <div className='url-bar-add-category'>
        <input type="text" className="url-bar-form" placeholder="add category"
        onKeyPress={this.keyPressed.bind(this)} ref={node => {
          this.input = node;
        }} />
        <div className='url-bar-category-button' onClick={()=> {
          var inputValue = this.input.value.trim();
          if (inputValue !== '') {
            this.addNewCategory(inputValue);
            this.input.value = '';
          }
        }}><i className="fa fa-plus" aria-hidden="true"></i>
        </div>
      </div>
    );
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

  getCategories() {
    if (this.props.page.categories) {
      return this.props.page.categories.map((category) => {
        return <div className='url-bar-category-thin' key={category.title} style={{"backgroundColor" : category.color}}>
            <div className="hide-overflow">{category.title}</div>
            <div className='url-bar-category-button' onClick={()=>{
                this.props.category_actions.toggleCategory(this.props.page.url, category, false, this.props.currentUser.token);
              }}>
            <i className='fa fa-times'></i>
            </div>
          </div>
      });
    }
  }

  openIframe(event){
    this.setState({ iframehider_show: true });
    this.setState({ iframe_show: true });
  }

  closeIframe(event){
    this.setState({ iframehider_show: false });
    this.setState({ iframe_show: false });
  }

  getIframe(){
    //DONT DELETE- LOADING PAGE INTERFACE
    // if(this.props.search_items.dom == "loading"){
    //   return(<div className="iframe-msg-box">
    //     <Loading/>
    //   </div>
    //   )
    // }
    if(this.props.page.s3 == "" && (this.props.orgin == "search" && this.props.s3 == "")){
      return(<div className="iframe-msg-box">
        <div className="iframe-error">Sorry, No html available for this page.</div>
      </div>
      )
    }else{
      if(this.props.origin == "search" ){
        return(<iframe className="m-iframe" src={this.props.s3}></iframe>)
      }else{
        return(<iframe className="m-iframe" src={this.props.page.s3}></iframe>)
      }
    }
  }

  toggleStar() {
    this.props.star_actions.toggleStar(false, this.props.page, this.props.currentUser.token);
  }

  render() {
    var modal = (this.state.iframe_show) ?
        <div className="modal-base" id="iframe-modal">
          <div className="i-modal-header">
              <a className="go-to-site-btn" href={this.props.page.url} target="_blank">
                go to page <i className="fa fa-arrow-circle-o-right fa-lg" aria-hidden="true"></i>
              </a>
              <div className="iframe-close-button " onClick={this.closeIframe.bind(this)}>
                <i className="fa fa-times fa-lg" aria-hidden="true"></i>
              </div>
              <div id="iframe-title">{this.props.page.title}</div>
          </div>
            {this.getIframe()}
            <div id="iframe-msg">This is a snapshot of this page at the time you visited it, some aspects may not render correctly.</div>
        </div>
    : ''
    var hider = (this.state.iframehider_show ) ? <div className="hider" onClick={this.closeIframe.bind(this)} id="iframe-hider"></div>: ''
    var visited = this.props.visited ? <p><Timestamp time={this.props.visited} format="full"/></p> : '';
    var domain = this.props.domain ? <p>{this.props.domain}</p> : '';
    var starred = this.props.page.star ? 'fa fa-star fa-2x star-categories starred' :
    'fa fa-star-o fa-2x star-categories';
    return (
      <div className="page-url-bar">
        {modal}
        {hider}
        <button className="iframe-open-button" onClick={this.openIframe.bind(this)}>
          <i className="fa fa-eye" aria-hidden="true"></i>
        </button>
        <div className="bar-text-col">
          <a className="url" target="_blank" href={this.props.page.url}>{this.props.page.title}</a>
          <div>
            {domain}
            {visited}
          </div>
        </div>
        <div className='url-categories-col vertical-center'>
          <div className='url-bar-input'>
            <div className='color-square-small' style={{"backgroundColor" : this.state.editColor}}/>
            {this.getCategoryEntry()}
            <div className='url-bar-star-div' onClick={this.toggleStar.bind(this)}>
              <i className={starred}></i>
            </div>
          </div>
          <div className='url-bar-categories'>
            {this.getCategories()}
          </div>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    currentUser : state.currentUser,
    search_items: state.search,
    categories: state.categories,
    categoriesAndPages: state.categoriesAndPages
})

let mapDispatchToProps = (dispatch) => ({
  lookback_actions: bindActionCreators(LookbackActions, dispatch),
  star_actions: bindActionCreators(StarActions, dispatch),
  category_actions: bindActionCreators(CategoryActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PageUrlBar);
