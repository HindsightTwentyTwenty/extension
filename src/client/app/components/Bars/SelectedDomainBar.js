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
    var barStyle = {"width" : width + "%"};
    return <PageBar page={pageVisit.page} style={barStyle} key={key}/>;
  }

  getPageBars(){
    var pageBars = [];
    var pageWidths = [];

    var pageVisits = this.props.domain.pagevisits;
    if(this.props.domain.closed == null){
      this.props.domain.end = new Date().getTime();
    }
    var domainOpenTime = this.getTimeOpen(this.props.domain.created, this.props.domain.closed);

    var minWidth = 100;
    for(var i = 0; i < pageVisits.length; i++){
      var pageOpenTime;
      if(i < pageVisits.length -1){
        pageOpenTime = this.getTimeOpen(pageVisits[i].visited, pageVisits[i+1].visited);
      }else{
        pageOpenTime = this.getTimeOpen(pageVisits[i].visited, this.props.domain.closed);
      }
      var width = (pageOpenTime/domainOpenTime) * 100;
      if(width < minWidth && width > 0){
        minWidth = width;
      }
      pageWidths.push(width);
    }

    //scale
    var scaleFactor = 1;
    if(minWidth < 7){
      scaleFactor = 7/minWidth;
    }

    for(var i = 0; i < pageVisits.length; i++){
      var adjWidth = pageWidths[i] * scaleFactor;
      if(adjWidth > 100){
        adjWidth = 100;
      }

      var pageBar = this.getPageBar(pageVisits[i], adjWidth, i);
      pageBars.push(pageBar);
    }
    return pageBars;
  }

  getTimeOpen(created, closed){
    var start = new Date(created).getTime();
    if(closed == null){
      var end = this.props.domain.end;
    }else{
      var end = new Date(closed).getTime();
    }
    var diff = end - start;
    return diff;
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
    currentDomainDisplayed: state.currentDomainDisplayed,
    currentUser : state.currentUser

})

let mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectedDomainBar);
