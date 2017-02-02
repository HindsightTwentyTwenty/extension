import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';


function getState() {
  return {
  }
}

class Search extends Component {


  constructor(props) {
    super(props);
    this.state = getState();

  }


  render() {
    return (
      <div>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({

})

let mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
