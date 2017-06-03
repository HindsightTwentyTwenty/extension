import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';

import * as PopupActions from '../../actions/Popup/PopupActions.js'

function getState(){
  return{
    note : "",
    editing: false
  }
}

class EditNote extends Component{
  constructor(props){
    super(props);
    this.state = getState();
  }

  saveNote(){
    this.props.popup_actions.editNote(
      this.props.currentUser.token,
      this.props.currentPage.url,
      this.props.currentPage.title,
      this.state.note
    );
  }

  changeNote(event){
    var new_note =  event.target.value;
    this.setState({note: new_note});
  }

  startEditingNote(){
    if(!this.state.editing){
      this.setState({editing: true});
      document.getElementById("note-text-edit").style.border = '1px solid #a2a2a2';
    }
  }

  stopEditingNote(){
    this.setState({editing: false});
    document.getElementById("note-text-edit").style.border = '0px';
    this.saveNote();
  }

  cancelEdit(){
    this.setState({editing: false});
    // document.getElementById("note-text-edit").style.backgroundColor = '#fafafa';
    document.getElementById("note-text-edit").style.border = '0px';
    document.getElementById("note-text-edit").value = this.props.currentPage.note;
  }

  toolBar(){
    if(!this.state.editing){
      return(
        <div id = "note-text-edit-options">
          <i className="fa fa-2x fa-pencil-square-o icon-hover" aria-hidden="true" onClick={this.startEditingNote.bind(this)}></i>
        </div>
      )
    }else{
      return(
        <div id = "note-text-edit-options">
          <i className="fa fa-2x fa-times icon-hover" id='icon-canceledit' aria-hidden="true" onClick={this.cancelEdit.bind(this)}></i>
          <i className="fa fa-2x fa-check-square-o icon-hover" id='icon-savedit' aria-hidden="true" onClick={this.stopEditingNote.bind(this)}></i>
        </div>
      )
    }
  }

  render(){
    var style = this.props.useCase == "onApp" ? {"width": "100%"} : {};
    var background = this.props.currentPage.notes
    return(
      <div id='editnote-wrapper' style={style} >
        <div id ="note-editing-box" >
          <textarea
              className="textarea-custom"
              style={style}
              type="text"
              id="note-text-edit"
              defaultValue={this.props.currentPage.note}
              onClick={this.startEditingNote.bind(this)}
              onChange={this.changeNote.bind(this)}
          />
          {this.toolBar()}
        </div>
      </div>
    );
  }

}

let mapStateToProps = (state) => ({
  currentPage: state.currentPage,
  currentUser: state.currentUser
})

let mapDispatchToProps = (dispatch) => {
  return {
    popup_actions: bindActionCreators(PopupActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditNote);
