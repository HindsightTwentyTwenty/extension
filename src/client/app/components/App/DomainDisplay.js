import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
const Timestamp = require('react-timestamp');


class DomainDetails extends Component {

  constructor(props) {
    super(props);
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
    return (
        <div>
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
    )
  }
}



let mapStateToProps = (state) => ({
  currentDomainDisplayed: state.currentDomainDisplayed,

})

let mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DomainDetails);
