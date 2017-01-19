import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';


class NoContent extends Component {

  constructor(props) {
      super(props);
  }

  render () {
    return (
      <div className="container popup-body">
        <div className="error-message">
          <h4> Please navigate to a different page to use hindsite.</h4>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({

})

let mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(NoContent);
