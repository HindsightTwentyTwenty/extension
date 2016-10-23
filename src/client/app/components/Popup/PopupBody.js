import React, { PropTypes, Component } from 'react'
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as PopupActions from '../../actions/Popup/PopupActions.js';
import CategoryEntry from './CategoryEntry.js';


class PopupBody extends Component {
  constructor(props) {
    super(props);
  }


  getTabs(){
    this.props.
    this.props.tabActions
  }


  savePage() {
    this.props.addPage()
  }


  render () {
    return (
      <div>
        <p>categorize this page: </p>
        <br/>
        <hr/>
        <CategoryEntry/>
        <button onClick={this.savePage.bind(this)}>save</button>
        <br/>
        <p>These are our categories: </p>
        {this.props.categories}

      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    pages : state.pages,
    categories: state.categories
  }
}

let mapDispatchToProps = () => {
  return {
    addPage : PopupActions.addPage
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupBody);
