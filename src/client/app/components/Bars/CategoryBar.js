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
    console.log("BAR props", this.props);
  }

  render() {
    var catColor = this.props.categoryInfo.color;
    var catStyle = false ? {"backgroundColor" : catColor, "color": "#FAFAFA"} : {"border" : "solid 2px " + catColor,"color": catColor };
    return (
      <div
        style={catStyle}
        className='category-bar hide-overflow'
        onClick={() => {
          this.props.category_actions.toggleCategory( this.props.currentPage.url, this.props.categoryInfo, !this.props.checked, this.props.currentUser.token);
        }}>
        {this.props.categoryInfo.title}
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
