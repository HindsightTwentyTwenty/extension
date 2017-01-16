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

  var pageBars = [];
  var pageWidths = [];
  
  getPageBar(pageVisit, width, key){
    var barStyle = {"width" : width + "%"};
    return <PageBar page={pageVisit.page} style={barStyle} key={key}/>;
  }

  getPageBars(){
    console.log(this.props.domain)

    var pageVisits = this.props.domain.pagevisits;
    if(this.props.domain.closed == null){
      this.props.domain.end = new Date().getTime();
    }
    var domainOpenTime = this.getTimeOpen(this.props.domain.created, this.props.domain.closed);

    var minWidth = 100;
    for(var i = 0; i < this.props.domain.pageVisits; i++){
      var closed;
      if(i < this.props.domain.pageVisits -1){
        closed = pageVisits[i+1].page.created;
      }else{
        closed = this.props.domain.closed;
      }
      var pageOpenTime = this.getTimeOpen(pageVisits[i].page.created, closed);
      var width = (pageOpenTime/domainOpenTime) * 100;
      if(parseFloat(width) < parseFloat(minWidth) && parseFloat(width) > parseInt(0)){
        minWidth = width;
      }
      pageWidths.push(width);
    }

    //scale
    var scaleFactor = 1;
    if(parseFloat(minWidth) < parseInt(2) && parseFloat(minWidth) > parseInt(0)){
      scaleFactor = 2/minWidth;
    }

    for(var i = 0; i < pageVisits.length; i++){
      var adjWidth = pageWidths[i] * scaleFactor;
      if(adjWidth > 100){
        adjWidth = 100;
      }
      if(adjWidth > 0){
        var pageBar = this.getPageBar(pageVisits[i], adjWidth, i);
      }
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
