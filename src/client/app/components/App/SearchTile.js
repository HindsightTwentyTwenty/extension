import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as PageDataActions from '../../actions/User/PageDataActions.js';
import * as NavActions from '../../actions/App/NavActions.js';
import * as LookbackActions from '../../actions/App/LookbackActions.js';
import * as GlobalConstants from '../../constants/GlobalConstants.js';
import EditNote from '../SideBar/EditNote.js'
import DetailModal from '../App/DetailModal.js'
import Loading from '../Popup/Loading.js';
import ModalSelector from './ModalSelector.js';
const Timestamp = require('react-timestamp');

class SearchTile extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.pagedata_actions.getImage(this.props.currentUser.md5, this.props.currentUser.ekey, this.props.page);
    /* reset the iframe box to a loading page until async call for decryption is made */
    this.props.pagedata_actions.receiveDecrypted("loading");
  }

  openDetailView(event){
    this.getDom();
    this.props.nav_actions.toggleDetailView();
    this.props.lookback_actions.setCurrentPage(this.props.page);
  }

  /* async get the dom from s3 with decryption */
  getDom(){
    /* only try to get the dom if not a 404 message */
    if(this.props.page.s3 != "https://s3.us-east-2.amazonaws.com/hindsite-production/404_not_found.html"){
      this.props.pagedata_actions.getIframeHTML(this.props.page.s3, this.props.currentUser.md5, this.props.currentUser.ekey);
    }
  }

  getCategories() {
    var categories = this.props.page.categories;
    var result = [];
    var numCatsShown = this.props.page.categories.length < 6 ? this.props.page.categories.length : 6;

    for(var i = 0; i < numCatsShown; i++) {
        result.push(<div
          className='category-bar hide-overflow'
          id={categories[i].title}
          style={{"backgroundColor" : categories[i].color , "color": "white" , "border" : "solid 2px " + categories[i].color}}
          >
          {categories[i].title}
        </div>);
    }
    return result;
  }

  render() {
    var modal = (this.props.appNav.showDetails) ? <DetailModal page={this.props.page}/> : ''
    var domain = this.props.page.domain ? <p>{this.props.page.domain}</p> : '';
    return (
      <div id="search-tile">
        {modal}
        <div>
          <div className="tile-screenshot-wrapper">
            <img className="tile-screenshot" src={this.props.page.preview}/>
            <div className="text-overlay">
              <i className="fa fa-eye text-overlay-btn" aria-hidden="true" onClick={this.openDetailView.bind(this)}></i>
            </div>
          </div>
          <a target="_blank" href={this.props.page.url}><p className="tile-title">{this.props.page.title}&nbsp;<i className="fa fa-external-link" aria-hidden="true"></i></p></a>
          {domain}
          <div id="tile-category-container">
            {this.getCategories()}
          </div>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    currentUser : state.currentUser,
    appNav: state.appNav,
    currentPage: state.currentPage
})

let mapDispatchToProps = (dispatch) => ({
  pagedata_actions: bindActionCreators(PageDataActions, dispatch),
  nav_actions: bindActionCreators(NavActions, dispatch),
  lookback_actions: bindActionCreators(LookbackActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchTile);
