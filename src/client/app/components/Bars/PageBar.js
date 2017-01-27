import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';
import * as LookbackActions from '../../actions/App/LookbackActions.js';

class PageBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.currentPage.url == this.props.page.url){
      this.props.page.star = this.props.currentPage.star;
    }
    return (
      <div
        className="page-bar"
        style={this.props.style}
        onMouseOver={() => {
          if(this.props.currentPage == undefined || (this.props.page.url !== this.props.currentPage.url)){
            this.props.lookback_actions.setCurrentPage(this.props.page, this.props.visited);
          }
        }}>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    currentPage: state.currentPage,
    currentUser : state.currentUser

})

let mapDispatchToProps = (dispatch) => ({
  lookback_actions: bindActionCreators(LookbackActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PageBar);
