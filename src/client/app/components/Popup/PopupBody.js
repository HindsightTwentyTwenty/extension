import React, { PropTypes, Component } from 'react'
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as PopupActions from '../../actions/Popup/PopupActions.js';
import CategoryEntry from './CategoryEntry.js';


class PopupBody extends Component {
  constructor(props) {
    super(props);
    this.props.popup_actions.fetchCategories();
  }


  render () {
    return (
      <div>
        <p>Categorize this page!</p>
        <br/>
        <hr/>
        <CategoryEntry/>
        <br/>
        <hr/>
        <button onClick={() => {
          this.props.popup_actions.fetchCategories();
        }}>
        Get All Entries</button>
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

let mapStateToProps = (state) => ({
    categories : state.categories
})

let mapDispatchToProps = (dispatch) => {
  return {
    popup_actions: bindActionCreators(PopupActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupBody);
