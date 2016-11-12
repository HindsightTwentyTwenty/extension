import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';

class DomainBar extends Component {

  constructor(props) {
    super(props);
    //TODO: favicon
  }

  render() {
    return (
      <div
        className="domain-bar"
        style= {this.props.style}
        width = {this.props.width}
        onMouseOver={() => {

        }}>
        <img id="domain-favicon" src={this.props.favicon_url}/>
        <label htmlFor='domainBar'> {this.props.title} </label>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    currentPage : state.currentPage
})

let mapDispatchToProps = (dispatch) => ({
  category_actions: bindActionCreators(CategoryActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(DomainBar);
