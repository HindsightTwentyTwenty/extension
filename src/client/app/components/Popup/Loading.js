import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';


class Loading extends Component {

  constructor(props) {
      super(props);
  }

  render () {
    return (
      <div id="loading_page">
        <i className="fa fa-align-center fa-spinner fa-pulse fa-5x fa-fw"></i>
        <span className="sr-only">Loading...</span>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({

})

let mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
