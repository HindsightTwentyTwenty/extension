import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as BlacklistActions from '../../actions/Blacklist/BlacklistActions.js';

class Blacklist extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="section-title">Blacklist</div>
        <div className="blacklist-text-entry">
          <input type="text" className="popup-form form-control" placeholder="Enter a site to be blacklisted..." ref={node => {
            this.input = node;
          }} />
          <span className="input-group-btn">
            <button className="btn add-category-btn" type="button" onClick={() => {
              if (this.input.value.trim() !== '') {
                console.log(this.input.value);
                // this.props.blacklist_actions.blacklistSite(this.input.value);
                this.input.value = '';
              }
            }}>+</button>
          </span>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    blacklist : state.blacklist
})

let mapDispatchToProps = (dispatch) => ({
  blacklist_actions: bindActionCreators(BlacklistActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Blacklist);
