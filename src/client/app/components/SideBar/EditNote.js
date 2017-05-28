import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';

import * as PopupActions from '../../actions/Popup/PopupActions.js'

function getState(){
  return{
    note : ""
  }
}

class EditNote extends Component{
  constructor(props){
    super(props);
    console.log("EDIT NOTE PROPS", this.props);
  }

  saveNote(){
    console.log("saving note");
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
    console.log("new note", new_note);
    // this.props.popup_actions.editNote(this.props.currentUser.token, this.props.currentPage.url, new_note);
  }


  render(){
    return(
      <div id="editnote-wrapper">
        <div id ="note-editing-box" >
          <textarea
              className="textarea-custom"
              type="text"
              id="note-text-edit"
              defaultValue={this.props.currentPage.note}
              onChange={this.changeNote.bind(this)}
          />
          <div id = "note-text-edit-options">
            <i className="fa fa-pencil-square-o" aria-hidden="true" onClick={this.saveNote.bind(this)}></i>
          </div>
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
