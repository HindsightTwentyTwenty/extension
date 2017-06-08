import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as LookbackActions from '../../actions/App/LookbackActions.js';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';
import * as PageDataActions from '../../actions/User/PageDataActions.js';
import * as GlobalConstants from '../../constants/GlobalConstants.js';
import * as NavActions from '../../actions/App/NavActions.js';
import EditNote from '../SideBar/EditNote.js'
import Loading from '../Popup/Loading.js';
import ModalSelector from './ModalSelector.js';
const Timestamp = require('react-timestamp');


class DetailModal extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    /* reset the iframe box to a loading page until async call for decryption is made */
    this.props.pagedata_actions.receiveDecrypted("loading");
  }

  closeDetailView(event){
    this.props.pagedata_actions.receiveDecrypted("loading");
    this.props.nav_actions.changeModalView("info");
    this.props.nav_actions.toggleDetailView();
    this.props.lookback_actions.setCurrentPage();
  }

  getIframe(){
    if(this.props.currentPage.s3 == "https://s3.us-east-2.amazonaws.com/hindsite-production/404_not_found.html"){
      /* this page is not an encrypted page, so just send back link to "bad page" message */
      return(<iframe className="m-iframe" src={this.props.currentPage.s3}></iframe>)
    }
    /* if this page has no s3 page */
    else if(this.props.currentPages3 == "" && this.props.s3 == ""){
      return(
        <div className="iframe-msg-box">
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

  getCategories() {
    var categories = this.props.currentPage.categories;
    var result = [];
    for(var pk in categories){
      var cat = categories[pk];
      result.push(<div className='category-bar hide-overflow' id={cat.title} style={{"backgroundColor" : cat.color , "color": "white" , "border" : "solid 2px " + cat.color}}>{cat.title}</div>);
    }
    return result;
  }

  getDetailView(){
    var visited = this.props.currentPage.last_visited ? <p>last visited: <Timestamp time={this.props.visited} format="full"/></p> : '';

    return(
      <div className="flex-col">
        <div className="flex-row">
          <div id='detail-screenshot-wrapper'>
            <a href={this.props.currentPage.url} target="_blank"><img id='detail-screenshot' src={this.props.currentPage.preview}/></a>
          </div>
          <div id='detail-text-wrap'>
            <a href={this.props.currentPage.url} target="_blank"><p id='detail-title' className="hide-overflow">{this.props.currentPage.title}&nbsp;<i className="fa fa-external-link" aria-hidden="true"></i></p></a>
            <p>{this.props.currentPage.domain}</p>
            {visited}
            <div>
              {this.getCategories()}
            </div>
          </div>
        </div>
        <div>
          <EditNote useCase="onApp"/>
        </div>
      </div>
    )
  }

  render() {
    if(this.props.appNav.showDetails){
      var modalContent = this.props.appNav.modalView == "info" ? <div id="modal-content">{this.getDetailView()}</div> : <div id="modal-content">{this.getIframe()}<div id="iframe-msg">This is a snapshot of this page at the time you visited it, some aspects may not render correctly.</div></div>;
      return (
        <div className="modal-base">
          <div className="i-modal-header">
            <div className="modal-close-button " onClick={this.closeDetailView.bind(this)}>
              <i className="fa fa-times fa-lg" aria-hidden="true"></i>
            </div>
            <ModalSelector/>
          </div>
          {modalContent}
        </div>
      )
    } else{
      return null;
    }
  }
}

let mapStateToProps = (state) => ({
    currentUser : state.currentUser,
    appNav: state.appNav,
    currentPage: state.currentPage
})

let mapDispatchToProps = (dispatch) => ({
  lookback_actions: bindActionCreators(LookbackActions, dispatch),
  pagedata_actions: bindActionCreators(PageDataActions, dispatch),
  nav_actions: bindActionCreators(NavActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailModal);
