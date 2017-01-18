import React, { PropTypes, Component } from 'react'
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as PopupActions from '../../actions/Popup/PopupActions.js';

class PopupHeader extends Component {
  constructor(props) {
    super(props);
  }

  openTab () {
    if(this.props.currentUser.token.length != 0){
      chrome.tabs.create({'url': chrome.extension.getURL('/app/main.html')}, function(tab){
      });
    }
  }

  render () {
    return (
      <div className="container">
        <div className="row popup-header">
          <div className="col-xs-10">
            <h1 className="popup-header-text">hindsite</h1>
          </div>
          <div className="col-xs-2 btn-wrapper">
            <div><img className="lookback-btn" src="../../assets/img/icon-48.png" onClick={this.openTab.bind(this)}/></div>
          </div>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    pages : state.pages,
    currentUser : state.currentUser

})

let mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(PopupHeader);
