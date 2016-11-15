import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';
import * as LookbackActions from '../../actions/App/LookbackActions.js';
import PageBar from '../Bars/PageBar.js';

class SelectedDomainBar extends Component {
  constructor(props) {
    super(props);
  }

  getPageBar(pageVisit, width, key){
    var barStyle = {"width" : width, "margin": '0'};
    return <PageBar page={pageVisit} style={barStyle} key={key}/>;
  }

  getPageBars(){
    var baseWidth = 100;
    var numPages = this.props.domain.pages;
    var equalDivide = (baseWidth / numPages) + "%";
    var pageBars = [];
    var pageVisits = this.props.domain.pagevisits;
    for(var i = 0; i < numPages; i++ ){
      var pageBar = this.getPageBar(pageVisits[i], equalDivide, i);
      pageBars.push(pageBar);
    }
    return pageBars;
  }

  render() {
    var pageBars = this.getPageBars();
    return (
      <div
        id = {this.props.domain.pk}
        className="selected-domain-bar">
        {pageBars}
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    currentDomainDisplayed: state.currentDomainDisplayed
})

let mapDispatchToProps = (dispatch) => ({
  lookback_actions: bindActionCreators(LookbackActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectedDomainBar);
