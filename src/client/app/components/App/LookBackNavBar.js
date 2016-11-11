import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as LookBackActions from '../../actions/LookBack/LookBackActions.js';
import * as LookBackSections from '../../constants/LookBackConstants.js'

class LookBackNavBar extends Component {

  constructor(props) {
    super(props);
  }

  switchLookBackSelection(newLookBackSelection){
      if(newLookBackSelection != this.props.currentLookBackSelection){
        this.props.lookback_actions.switchLookBackSelection(newLookBackSelection)
      }
  }



  render() {
    console.log(this.props);

    return (
      <div className="container">
        <div className ="row">
          <div className="col-xs-12">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search..." ref={node => {
                this.input = node;
              }} />
              <span className="input-group-btn">
                <button className="btn btn-primary" type="button" onClick={() => {
                  this.switchLookBackSelection(LookBackSections.LookBack)
                }}>lookback</button>
                <button className="btn btn-primary" type="button" onClick={() => {
                  this.switchLookBackSelection(LookBackSections.Categories)
                }}>categories</button>
                <button className="btn btn-primary" type="button" onClick={() => {
                  this.switchLookBackSelection(LookBackSections.Manage)
                }}>manage</button>
                <button className="btn btn-primary" type="button" onClick={() => {
                  this.switchLookBackSelection(LookBackSections.Find)
                }}>find</button>
              </span>
            </div>
          </div>
        </div>
      </div>

    );
  }

}




let mapStateToProps = (state) => ({
  currentLookBackSelection: state.currentLookBackSelection
})

let mapDispatchToProps = (dispatch) => {
  return {
    lookback_actions: bindActionCreators(LookBackActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LookBackNavBar);
