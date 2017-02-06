import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import Star from '../Star/Star.js';
import * as LookbackActions from '../../actions/App/LookbackActions.js';
import * as StarActions from '../../actions/Star/StarActions.js';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';


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

  }

  getCategories() {
    return this.props.page.categories.map(function(category) {
      return <div className={'url-bar-category'} key={category.title}> {category.title} </div>;
    });
  }

  getDOM(){
    console.log("token:", this.props.currentUser.token);
    console.log("props:", this.props);

    this.props.lookback_actions.getDOM(this.props.visit_pk, this.props.currentUser.token);
  }

  openIframe(event){
    this.getDOM();
    this.setState({ iframehider_show: true });
    this.setState({ iframe_show: true });
  }

  closeIframe(event){
    this.setState({ iframehider_show: false });
    this.setState({ iframe_show: false });

  }

  render() {
    var starred = this.props.page.star ? 'fa fa-star fa-2x star-categories' : 'fa fa-star-o fa-2x star-categories';
    return (
      <div className={'url-bar'}>
        {this.state.iframe_show ?
            <div className="modal-base" id="iframe-modal">
                <button id="iframe-close-button " onClick={this.closeIframe.bind(this)}>
                  x
                </button>
                <iframe className="m-iframe" src={this.props.page.url}></iframe>
            </div>
        : ''}
        {this.state.iframehider_show ? <div className="hider" id="iframe-hider"></div>: ''}
        <a className={'url'} target="_blank" href={this.props.page.url}>{this.props.page.title}</a>
        <button id="iframe-open-button" onClick={this.openIframe.bind(this)}>
          <span className="glyphicon glyphicon-eye-open"></span>
        </button>
        <div className='url-categories'>
          {this.getCategories()}
          <div onClick={()=>{
            this.props.star_actions.toggleStar(this.props.page, this.props.currentUser.token);
            this.props.category_actions.fetchCategoriesAndPages( this.props.currentUser.token);
            }}>
            <i className={starred}></i>
          </div>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    currentUser : state.currentUser,
    currentPage : state.currentPage,

})

let mapDispatchToProps = (dispatch) => ({
  lookback_actions: bindActionCreators(LookbackActions, dispatch),
  star_actions: bindActionCreators(StarActions, dispatch),
  category_actions: bindActionCreators(CategoryActions, dispatch)

})

export default connect(mapStateToProps, mapDispatchToProps)(PageUrlBar);
