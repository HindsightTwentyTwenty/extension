import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';

class PageUrlBar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    var className = this.props.page.star ? 'url-bar starred' : 'url-bar';
    return (
      <div className={className}>
        <a target="_blank" href={this.props.page.url}>{this.props.page.title}</a>
      </div>
    )
  }
}

export default connect(null, null)(PageUrlBar);
