import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as PopupActions from '../../actions/Popup/PopupActions.js';
import CategoryEntry from './CategoryEntry.js';
import Star from '../Star/Star.js';


class PopupBody extends Component {
  constructor(props) {
    super(props);
    console.log("this.props: " + this.props);
  }


  render () {
    if (this.props.categories) {
      var categoryList =
        <ul>
          {this.props.categories.map(category =>
            <li key={category.title}>{category.title}</li>
          )}
        </ul>
      };
    return (
      <div className="container popup-body">
        <div className="row">
          <div className="col-xs-10">
            <h3>Title</h3>
          </div>
          <div className="col-xs-2">
            <Star/>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <h4>categorize this page:</h4>
          </div>
        </div>
        <div className="row">
          <hr/>
        </div>
        <div className="row">
            <CategoryEntry/>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <p>These are your categories:</p>
            <div>{categoryList}</div>
          </div>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

let mapDispatchToProps = () => {
  return {
    addPage : PopupActions.addPage
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupBody);
