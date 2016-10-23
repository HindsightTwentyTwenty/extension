import React, { PropTypes, Component } from 'react'
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as PopupActions from '../../actions/Popup/PopupActions.js';
import CategoryEntry from './CategoryEntry.js';


class PopupBody extends Component {
  constructor(props) {
    super(props);
    console.log("this.props: " + this.props);
    this.props.fetchCategories();
  }


  render () {
    return (
      <div>
        <p>Categorize this page!</p>
        <br/>
        <hr/>
        <CategoryEntry/>
        <br/>
        <p>These are your categories:</p>
        <ul>
          {this.props.categories.map(category =>
            <li key={category.title}>{category.title}</li>
          )}
        </ul>
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
    addPage : PopupActions.addPage,
    fetchCategories: PopupActions.fetchCategories
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupBody);
