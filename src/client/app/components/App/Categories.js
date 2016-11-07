import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';

class Analyze extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <p>Categories Page Placeholder</p>
    )
  }

}




let mapStateToProps = (state) => ({
})

let mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Analyze);
