import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';

class Manage extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <p>Manage Page Placeholder</p>
    )
  }

}




let mapStateToProps = (state) => ({

})

let mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Manage);
