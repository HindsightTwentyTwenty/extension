import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';
import * as LookbackActions from '../../actions/App/LookbackActions.js';
import * as LookBackConstants from '../../constants/LookBackConstants';

class PageBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var style = Object.assign({}, this.props.style);
    if(this.props.currentPage.url == this.props.page.url){
      this.props.page.star = this.props.currentPage.star;
      this.props.page.categories = this.props.currentPage.categories;
      var style = Object.assign({}, this.props.style, {"backgroundColor": "#FA6E59"});
    }
    return (
      <div
        className="page-bar"
        style={style}
        onClick={() => {window.open(this.props.page.url)}}
        onMouseOver={() => {
          if(this.props.currentPage == undefined || (this.props.page.url !== this.props.currentPage.url)){
            if(this.props.currentPage === LookBackConstants.DEFAULT_IMG){
              this.props.lookback_actions.setCurrentPage(this.props.page, this.props.visited, this.props.preview);

            }else{
              this.props.lookback_actions.getImage(this.props.preview, this.props.currentUser.md5, this.props.currentUser.ekey, this.props.page, this.props.visited);
            }
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
