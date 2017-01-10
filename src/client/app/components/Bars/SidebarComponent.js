import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import SidebarCategoryBar from './SidebarCategoryBar';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';

class SidebarComponent extends Component {

  constructor(props) {
    super(props);
    this.allCategories = this.props.allCategories;
    this.title = this.props.title;
  }

  getCategories() {
    var currentSearchCategories = this.props.currentSearchCategories;
    if (Object.keys(this.props.allCategories).length) {
      let result = []
      for (var i = 0; i < this.props.allCategories.length; i++) {
        var categoryBarMade = false;
        for (var j = 0; j < currentSearchCategories.length; j++) {
          if (currentSearchCategories[j] === this.props.allCategories[i].title) {
            result.push(<SidebarCategoryBar categoryInfo={this.props.allCategories[i]} checked={true} key={this.props.allCategories[i].title}/>);
              categoryBarMade = true;
              break;
          }
        }
        if (!categoryBarMade) {
          result.push(<SidebarCategoryBar categoryInfo={this.props.allCategories[i]} checked={false} key={this.props.allCategories[i].title}/>)
        }
      }
      return result
    }
  }

  getCheckBox() {
    if (this.props.button) {
      return (<div className="control-buttons">
        <label> <input type="checkbox" id="check-select" value="first_checkbox"/> select multiple </label>
      </div>)
    }
  }

  render() {
    var categories = this.getCategories();
    return (
      <div className="side-bar-container">
        <div className="side-bar-header">
          <div className="side-bar-title">{this.title}</div>
          {this.getCheckBox()}
        </div>
        <div className="all-categories">{categories}</div>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  currentSearchCategories : state.currentSearchCategories
})

let mapDispatchToProps = (dispatch) => {
  return {
    category_actions: bindActionCreators(CategoryActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarComponent);
