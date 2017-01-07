import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import PopupHeader from './PopupHeader.js';
import PopupBody from './PopupBody.js';
import LoginPage from './LoginPage.js';


class Popup extends Component {
  constructor(props) {
    super(props);
  }

  renderContent(){
    console.log("token");

    console.log(this.props.currentUser.token);
    if(this.props.currentUser.token.length == 0){
      return (
        <div>
          <LoginPage/>
        </div>
      );
    }else{
      return (
        <div>
          <PopupHeader/>
          <PopupBody/>
        </div>
      );
    }
  }


  render() {
    return (
      <div>
        { this.renderContent() }
      </div>
    );
  }
}


let mapStateToProps = (state) => ({
    currentUser : state.currentUser
})

let mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
