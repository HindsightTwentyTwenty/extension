import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import Star from '../Star/Star.js';
import * as LookbackActions from '../../actions/App/LookbackActions.js';
import * as StarActions from '../../actions/Star/StarActions.js';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';

class PageUrlBar extends Component {

  constructor(props) {
    super(props);
  }

  getCategories() {
    return this.props.page.categories.map(function(category) {
      return <div className={'url-bar-category'} key={category.title}> {category.title} </div>;
    });
  }

  render() {
    var starred = this.props.page.star ? 'fa fa-star fa-2x star-categories' : 'fa fa-star-o fa-2x star-categories';
    return (
      <div className={'url-bar'}>
        <a className={'url'} target="_blank" href={this.props.page.url}>{this.props.page.title}</a>
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
