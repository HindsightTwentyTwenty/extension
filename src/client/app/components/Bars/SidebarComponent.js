import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import SidebarCategoryBar from './SidebarCategoryBar';

class SidebarComponent extends Component {

  constructor(props) {
    super(props);
    this.allCategories = this.props.allCategories;
    this.title = this.props.title;
  }

  getCategories() {
    if (Object.keys(this.props.allCategories).length) {
      let result = []
      for (var i = 0; i < this.props.allCategories.length; i++) {
        result.push(<SidebarCategoryBar categoryInfo={this.props.allCategories[i]}
          key={this.props.allCategories[i].title}/>)
      }
      return result
    }
  }

  render() {
    var categories = this.getCategories();
    return (
      <div className="side-bar-container">
        <div className="side-bar-title">{this.title}</div>
        <div className="all-categories">{categories}</div>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
})

let mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarComponent);
