import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';

class Find extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <p>Find Page Placeholder</p>
    )
  }

}




let mapStateToProps = (state) => ({

})

let mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Find);
