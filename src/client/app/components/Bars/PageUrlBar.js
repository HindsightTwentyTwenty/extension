import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import Star from '../Star/Star.js';
import * as LookbackActions from '../../actions/App/LookbackActions.js';
import * as StarActions from '../../actions/Star/StarActions.js';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';
const Timestamp = require('react-timestamp');


function getState() {
  return {
    iframe_show:false,
    iframehider_show:false
  }
}

class PageUrlBar extends Component {

  constructor(props) {
    super(props);
    this.state = getState();
    this.props.category_actions.fetchCategoriesAndPages(this.props.currentUser.token);
  }

  getCategories() {
    if (this.props.page.categories) {
      return this.props.page.categories.map((category) => {
        return <div className={'url-bar-category'} key={category.title} style={{"backgroundColor" : category.color}}>
            {category.title}
            <div className='url-bar-category-times' onClick={()=>{
                this.props.category_actions.toggleCategory(this.props.page.url, category, false, this.props.currentUser.token);
              }}>
            <i className='fa fa-times'></i>
            </div>
          </div>;
      });
    }
  }

  getDOM(){
    if(this.props.visit_pk){
      this.props.lookback_actions.getDOM(this.props.visit_pk, this.props.currentUser.token);
    }
  }

  openIframe(event){
    this.getDOM();
    this.setState({ iframehider_show: true });
    this.setState({ iframe_show: true });
  }

  closeIframe(event){
    this.setState({ iframehider_show: false });
    this.setState({ iframe_show: false });
    this.props.lookback_actions.clearDOM();
  }

  render() {
    var starred = this.props.page.star ? 'fa fa-star fa-2x star-categories starred' : 'fa fa-star-o fa-2x star-categories';
    var modal = (this.props.search_items.dom && this.state.iframe_show) ?
        <div className="modal-base" id="iframe-modal">
          <div className="i-modal-header">
            <div className="iframe-close-button " onClick={this.closeIframe.bind(this)}>
              <i className="fa fa-times fa-lg" aria-hidden="true"></i>
            </div>
          </div>
            <iframe className="m-iframe" srcDoc={this.props.search_items.dom}></iframe>
        </div>
    : ''
    var hider = (this.state.iframehider_show && this.props.search_items.dom ) ? <div className="hider" onClick={this.closeIframe.bind(this)} id="iframe-hider"></div>: ''
    var visited = this.props.visited ? <p>visited: <Timestamp time={this.props.visited} format="full"/></p> : '';
    var domain= this.props.domain ? <p>{this.props.domain}</p> : '';

    return (
      <div className="page-url-bar">
        {modal}
        {hider}
          <div className="bar-text-col">
            <a className="url" target="_blank" href={this.props.page.url}>{this.props.page.title}</a>
            <div>
            {visited}
            {domain}
            </div>
          </div>
          <div className='url-categories vertical-center'>
            {this.getCategories()}
          </div>
          <div className='url-buttons vertical-center'>
            <div className='star-div' onClick={()=>{
            this.props.star_actions.toggleStar(this.props.page, this.props.currentUser.token);
            }}>
              <i className={starred}></i>
            </div>
            <button className="iframe-open-button" onClick={this.openIframe.bind(this)}>
              <i className="fa fa-eye" aria-hidden="true"></i>
            </button>
          </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    currentUser : state.currentUser,
    currentPage : state.currentPage,
    search_items: state.search

})

let mapDispatchToProps = (dispatch) => ({
  lookback_actions: bindActionCreators(LookbackActions, dispatch),
  star_actions: bindActionCreators(StarActions, dispatch),
  category_actions: bindActionCreators(CategoryActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PageUrlBar);
