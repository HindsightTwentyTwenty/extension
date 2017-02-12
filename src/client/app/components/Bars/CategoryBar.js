import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';
var classNames = require('classnames');

class CategoryBar extends Component {

  constructor(props) {
    super(props);
    this.categoryInfo = this.props.categoryInfo;
  }

  render() {
    var catColor = this.props.categoryInfo.color;
    // var catStyle = this.props.checked ? {"backgroundColor" : catColor} : {"border" : "solid 2px " + catColor};
    // var catClass = this.props.checked ? 'category-bar ' + catColor : 'category-bar ' + catColor + '-border';
    //
    // return (
    //   <div
    //     className={catClass}
    var catStyle = this.props.checked ? {"backgroundColor" : catColor} : {"border" : "solid 2px " + catColor};
    return (
      <div
        style={catStyle}
        className={'category-bar'}
        onClick={() => {
          this.props.category_actions.toggleCategory( this.props.currentPage.url,
            this.props.categoryInfo, !this.props.checked, this.props.currentUser.token);
        }}>
        <label htmlFor='categoryBar' className={'category-bar-label hide-overflow'}> {this.props.categoryInfo.title} </label>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    currentPage : state.currentPage,
    currentUser : state.currentUser
})

let mapDispatchToProps = (dispatch) => ({
  category_actions: bindActionCreators(CategoryActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryBar);
