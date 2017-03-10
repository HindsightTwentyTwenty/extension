import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';
import DomainDisplay from './DomainDisplay.js'
const Timestamp = require('react-timestamp');
class DisplayDetails extends Component {

  constructor(props) {
    super(props);
    this.props.category_actions.fetchCategories(this.props.currentUser.token);
  }

  render() {
    var currentDomain = this.props.currentDomainDisplayed;
    if(currentDomain.clicked == undefined){
      return(<div className="lookback-details-container"><h3 className="horizontal-center vertical-center">Hover over timeline for detailed domain information. Click to zoom.</h3></div>);
    } else {
        return(
          <div className="lookback-details-container">
            <DomainDisplay/>
          </div>
        )
      }
  }
}

let mapStateToProps = (state) => ({
  currentDomainDisplayed: state.currentDomainDisplayed,
  currentPage: state.currentPage,
  currentUser: state.currentUser,
  categories: state.categories
})

let mapDispatchToProps = (dispatch) => {
  return {
      category_actions: bindActionCreators(CategoryActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayDetails);
