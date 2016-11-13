import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';
import * as LookbackActions from '../../actions/App/LookbackActions.js';

class DomainBar extends Component {

  constructor(props) {
    super(props);
    //TODO: favicon
  }

  displayDetails(){
    this.props.lookback_actions.updateDomainDetailsDisplay(this.props.domain);
  }

  render() {
    return (
      <div
        className="domain-bar"
        style= {this.props.style}
        width = {this.props.width}
        onMouseOver={() => {
          this.displayDetails();
        }}>
        <img id="domain-favicon" src={this.props.favicon_url}/>
        <label htmlFor='domainBar'> {this.props.domain.title} </label>

      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    currentPage : state.currentPage,
    domainDetails: state.domainDetails
})

let mapDispatchToProps = (dispatch) => ({
  lookback_actions: bindActionCreators(LookbackActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(DomainBar);
