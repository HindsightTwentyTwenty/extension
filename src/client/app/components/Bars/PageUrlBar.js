import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';

class PageUrlBar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    var starred = this.props.page.star ? 'fa fa-star fa-2x star-categories' : 'fa fa-star-o fa-2x star-categories';
    return (
      <div className={'url-bar'}>
        <a className={'url'} target="_blank" href={this.props.page.url}>{this.props.page.title}</a>
        <i className={starred}></i>
      </div>
    )
  }
}

export default connect(null, null)(PageUrlBar);
