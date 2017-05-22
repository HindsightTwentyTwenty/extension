import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';

function getState(){
  return{
    pageTitle: ""
  }
}

class TagSelection extends Component{
  constructor(props){
    super(props);
    this.state = getState();
  }

  componentDidMount(){
    this.setState({
      pageTitle:this.props.currentPage.title
    })
  }

  hoverOnTitle(){
    document.getElementById("edit-icon").style.display='block';
  }

  leaveHoverOnTitle(){
    document.getElementById("edit-icon").style.display='none';
  }

  editPageTitle(event){
    this.setState({
      pageTitle: event.target.value
    });
  }

  render(){
    return(
      <div id="tag-selection-wrapper">
          <div className="row" id="row-url-entry">
            <img id="favicon-url-entry" src={this.props.currentPage.favIconUrl} />
            <input type="text" className="login-form form-control" id="title-url-entry" defaultValue={this.props.currentPage.title} onMouseOver={this.hoverOnTitle.bind(this)} onMouseLeave={this.leaveHoverOnTitle.bind(this)} onClick={this.editPageTitle.bind(this)}/>
            <i id="edit-icon" className="fa fa-2x fa-pencil-square-o" aria-hidden="true" style={{display:"none"}}></i>
          </div>
      </div>
    );
  }

}

let mapStateToProps = (state) => ({
  currentPage : state.currentPage
})

let mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagSelection);
