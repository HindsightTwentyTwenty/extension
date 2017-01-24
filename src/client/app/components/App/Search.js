import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';

class Search extends Component {

  constructor(props) {
    super(props);

    console.log("Search Results:", this.props.search);

  }

  render() {
    return (
      <div id="search-container">
        Search
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  search: state.search
})


let mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);
