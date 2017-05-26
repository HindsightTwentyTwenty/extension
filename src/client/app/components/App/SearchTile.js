import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as LookbackActions from '../../actions/App/LookbackActions.js';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';
import * as PageDataActions from '../../actions/User/PageDataActions.js';
import * as GlobalConstants from '../../constants/GlobalConstants.js';
import Loading from '../Popup/Loading.js';
const Timestamp = require('react-timestamp');

function getState() {
  return {
    iframe_show:false,
    iframehider_show:false,
  }
}

class SearchTile extends Component {
  constructor(props) {
    super(props);
    this.state = getState();
  }

  componentWillMount() {
    
    /* reset the iframe box to a loading page until async call for decryption is made */
    this.props.pagedata_actions.receiveDecrypted("loading");
  }

  openIframe(event){
    this.getDom();
    this.setState({ iframehider_show: true });
    this.setState({ iframe_show: true });
  }

  closeIframe(event){
    this.setState({ iframehider_show: false });
    this.setState({ iframe_show: false });
    this.props.pagedata_actions.receiveDecrypted("loading");

  }

  /* async get the dom from s3 with decryption */
  getDom(){
    /* only try to get the dom if not a 404 message */
    if(this.props.page.s3 != "https://s3.us-east-2.amazonaws.com/hindsite-production/404_not_found.html"){
      if(this.props.origin == "search" ){
        this.props.pagedata_actions.getIframeHTML(this.props.s3, this.props.currentUser.md5, this.props.currentUser.ekey);
      }else{
        this.props.pagedata_actions.getIframeHTML(this.props.page.s3, this.props.currentUser.md5, this.props.currentUser.ekey);
      }
    }
  }

  getIframe(){
    console.log("props:", this.props);
    console.log("current page", this.props.currentPage);
    if(this.props.page.s3 == "https://s3.us-east-2.amazonaws.com/hindsite-production/404_not_found.html"){
      /* this page is not an encrypted page, so just send back link to "bad page" message */
      return(<iframe className="m-iframe" src={this.props.page.s3}></iframe>)
    }
    /* if this page has no s3 page */
    else if(this.props.page.s3 == "" && (this.props.orgin == "search" && this.props.s3 == "")){
      return(<div className="iframe-msg-box">
        <div className="iframe-error">Sorry, No html available for this page.</div>
      </div>
      )
    }
    /* if the decryption hasn't finished yet, show loading */
    else if(this.props.currentPage.s3_decrypted == "loading"){
      return(<div className="iframe-msg-box">
        <Loading/>
      </div>
      )
    }else{
        return(<iframe className="m-iframe" srcDoc={this.props.currentPage.s3_decrypted}></iframe>)
    }
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
    return (
      <div id="search-tile">
        {modal}
        {hider}
        <button className="iframe-open-button" onClick={this.openIframe.bind(this)}>
          <i className="fa fa-eye" aria-hidden="true"></i>
        </button>
        <div>
          <img src={this.props.page.preview}/>
          <a target="_blank" href={this.props.page.url}>{this.props.page.title}</a>
          <div>
            {domain}
            {visited}
          </div>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    currentPage: state.currentPage,
    currentUser : state.currentUser,
    search_items: state.search,
    categories: state.categories,
    categoriesAndPages: state.categoriesAndPages
})

let mapDispatchToProps = (dispatch) => ({
  lookback_actions: bindActionCreators(LookbackActions, dispatch),
  category_actions: bindActionCreators(CategoryActions, dispatch),
  pagedata_actions: bindActionCreators(PageDataActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchTile);
