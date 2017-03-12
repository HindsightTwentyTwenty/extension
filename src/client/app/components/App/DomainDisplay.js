import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
const Timestamp = require('react-timestamp');
import * as CategoryActions from '../../actions/Category/CategoryActions.js';
import * as LookbackActions from '../../actions/App/LookbackActions.js';




class DomainDisplay extends Component {

  constructor(props) {
    super(props);
    this.props.category_actions.fetchCategories(this.props.currentUser.token);
  }

  render() {
    var currentDomain = this.props.currentDomainDisplayed;
    let closed = null;
    if(currentDomain.closed != null){
      closed = <p className={'domain-info'}>closed: <Timestamp time={currentDomain.closed} format="full"/></p>;
    }else{
      closed = <p className={'domain-info'}>closed: still open</p>;
    }
    let favicon = null;
    if(currentDomain.favicon != ""){
      favicon = <img className="display-favicon" src={currentDomain.favicon}/>
    }
    var currentDomain = this.props.currentDomainDisplayed;
    if(currentDomain.clicked == undefined){
      return(<div className="lookback-details-container"><h3 className="horizontal-center vertical-center">Hover over timeline for detailed domain information. Click to zoom.</h3></div>);
    } else {
        return(
          <div className="lookback-details-container" onClick={() => {
          if(currentDomain.clicked){
            this.props.lookback_actions.toggleDomainClicked();
            this.props.lookback_actions.setCurrentPage({});
          }}}>
            <div className="domain-details">
                <div className="row flex-row">
                  <div>
                    {favicon}
                  </div>
                  <h3>{currentDomain.title}</h3>
                </div>
                <div className="row flex-row">
                  <p className={'domain-info'}>pages visited: {currentDomain.pages}</p>
                  <p className={'domain-info'}>minutes active: {currentDomain.minutes_active}</p>
                </div>
                <div className="row flex-row">
                  <p className={'domain-info'}>opened: <Timestamp time={currentDomain.created} format="full"/></p>
                  {closed}
                </div>
            </div>
          </div>
        )
      }
  }
}



let mapStateToProps = (state) => ({
  currentDomainDisplayed: state.currentDomainDisplayed,
  currentUser: state.currentUser
})

let mapDispatchToProps = (dispatch) => {
  return {
    category_actions: bindActionCreators(CategoryActions, dispatch),
    lookback_actions: bindActionCreators(LookbackActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DomainDisplay);
