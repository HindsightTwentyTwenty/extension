import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import Star from '../Star/Star.js';
import * as LookbackActions from '../../actions/App/LookbackActions.js';
import * as StarActions from '../../actions/Star/StarActions.js';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';
const Timestamp = require('react-timestamp');


class PageUrlBar extends Component {

  constructor(props) {
    super(props);
  }

  getCategories() {
    var _this = this;
    this.props.category_actions.fetchCategoriesAndPages(this.props.currentUser.token);
    return this.props.page.categories.map(function(category){
      return <div className={'url-bar-category'} key={category.title}>
          {category.title}
          <div className='url-bar-category-times' onClick={()=>{
              _this.props.category_actions.toggleCategory(_this.props.page.url, category, false, _this.props.currentUser.token);
            }}>
            <i className='fa fa-times'></i>
          </div>
        </div>;
    });
  }

  render() {
    var starred = this.props.page.star ? 'fa fa-star fa-2x star-categories' : 'fa fa-star-o fa-2x star-categories';
    return (
      <div className="page-url-bar">
          <div className="bar-text-col">
            <a className="url" target="_blank" href={this.props.page.url}>{this.props.page.title}</a>
            <div>
              <p>{this.props.domain.base_url}</p>
              <p>visited: <Timestamp time={this.props.visited} format="full"/></p>
            </div>
          </div>
          <div className='url-categories vertical-center'>
            {this.getCategories()}
          </div>
          <div className='vertical-center' onClick={()=>{
            this.props.star_actions.toggleStar(this.props.page, this.props.currentUser.token);
            }}>
            <i className={starred}></i>
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
