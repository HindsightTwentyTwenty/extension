import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as PageDataActions from '../../actions/User/PageDataActions.js';
import * as NavActions from '../../actions/App/NavActions.js';
import * as GlobalConstants from '../../constants/GlobalConstants.js';
import Loading from '../Popup/Loading.js';
import DetailModal from '../App/DetailModal.js'
const Timestamp = require('react-timestamp');

class PageUrlBar extends Component {
  constructor(props) {
    super(props);
    if(this.props.result){
      this.page = this.props.result.page;
      this.page.domain = this.props.result.domain;
      this.page.visited = this.props.result.visited;
      this.page.preview = this.props.result.preview
      this.page.s3 = this.props.result.s3;
    }else{
      this.page = this.props.page;
    }

  }

  componentWillMount() {
    this.props.pagedata_actions.getImage(this.props.currentUser.md5, this.props.currentUser.ekey, this.page);
    /* reset the iframe box to a loading page until async call for decryption is made */
    this.props.pagedata_actions.receiveDecrypted("loading");
  }

  openDetailView(event){
    this.getDom();
    this.props.nav_actions.toggleDetailView();
  }

  /* async get the dom from s3 with decryption */
  getDom(){
    /* only try to get the dom if not a 404 message */
    if(this.page.s3 != "https://s3.us-east-2.amazonaws.com/hindsite-production/404_not_found.html"){
      this.props.pagedata_actions.getIframeHTML(this.page.s3, this.props.currentUser.md5, this.props.currentUser.ekey);
    }
  }

  render() {
    var modal = (this.props.appNav.showDetails) ? <DetailModal page={this.page}/> : ''
    var visited = this.page.visited ? <p className="bar-text"><Timestamp time={this.page.visited} format="full"/></p> : '';
    var domain = this.page.domain ? <p className="bar-text">{this.page.domain}</p> : '';
    return (
      <div className="page-url-bar">
        {modal}
        <div className="bar-text-col">
          <a className="url" target="_blank" href={this.page.url}><h4>{this.page.title}</h4> <i className="fa fa-external-link" aria-hidden="true"></i></a>
          {domain}
          {visited}
        </div>
        <div>
          <button className="iframe-open-button" onClick={this.openDetailView.bind(this)}>
            <i className="fa fa-eye" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    currentUser : state.currentUser,
    appNav: state.appNav
})

let mapDispatchToProps = (dispatch) => ({
  pagedata_actions: bindActionCreators(PageDataActions, dispatch),
  nav_actions: bindActionCreators(NavActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PageUrlBar);
