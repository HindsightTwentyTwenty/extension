import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';
import * as LookbackActions from '../../actions/App/LookbackActions.js';

class DomainBar extends Component {
  constructor(props) {
    super(props);
  }

  selectDomain(){
    this.props.lookback_actions.getDomain(this.props.domain.pk, this.props.currentUser.token);
  }

  previewDomain(){
    this.props.lookback_actions.updateDisplayDomain(this.props.domain, false);
  }

  render() {
    var id_code = this.props.tab_id + "-" + this.props.domain.pk;
    return (
      <div
        id = {id_code}
        className="domain-bar"
        style = {this.props.style}
        onMouseDown={()=>{
          // this.selectDomain();
        }}
        onMouseOver={() => {
          this.previewDomain();
          this.highlight_previous();
        }}
        onMouseLeave={() => {
          this.unhighlight_previous();
        }}>
        <img className="domain-favicon" src={this.props.favicon}/>
        <label htmlFor='domainBar'>{this.props.domain.title}</label>
      </div>
    )
  }

  highlight_previous() {
    var element = document.getElementById(this.props.domain.opened_from_tabid + "-" + this.props.domain.opened_from_domain);
    if(element){
      element.classList.add('previousPath');
    }
  }
  unhighlight_previous() {
    var element = document.getElementById(this.props.domain.opened_from_tabid + "-" + this.props.domain.opened_from_domain);
    if(element){
      element.classList.remove('previousPath');
    }
  }
}

let mapStateToProps = (state) => ({
  currentUser : state.currentUser
})

let mapDispatchToProps = (dispatch) => ({
  lookback_actions: bindActionCreators(LookbackActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(DomainBar);
