import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';


function getState(){
  return{
  }
}

class CategoryBubble extends Component{
  constructor(props){
    super(props);
    this.state = getState();
  }

  render(){
    console.log("key", this.props);


    return(
      <div >
        BLAH BLAH x
      </div>
    );
  }

}

let mapStateToProps = (state) => ({
})

let mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryBubble);
