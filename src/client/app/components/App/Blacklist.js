import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import BlacklistBar from '../Bars/BlacklistBar.js';
import * as BlacklistActions from '../../actions/Blacklist/BlacklistActions.js';

class Blacklist extends Component {

  constructor(props) {
    super(props);
    this.props.blacklist_actions.fetchBlacklist(this.props.currentUser.token);
  }

  fetchSites() {
    if (this.props.blacklist.urls) {
      return this.props.blacklist.urls.map(function(site) {
        return (<BlacklistBar key={site.pk} title={site.base_url} created={site.created} pk={site.pk}/>);
      });
    }
  }

  render() {
    var blacklistedSites = this.fetchSites();
    return (
      <div>
        <div className="section-title">Blacklisted Sites</div>
        <div className="input-group category-entry">
          <input type="text" className="form-control" placeholder="Enter a site to be blacklisted. Must start with 'https://' or 'http://'"  ref={node => {
            this.input = node;
          }} />
          <span className="input-group-btn">
            <button className="btn add-category-btn" type="button" onClick={() => {
              var input = this.input.value.trim();
              if (input.substring(0, 8) == 'https://' || input.substring(0, 7) == 'http://') {
                this.props.blacklist_actions.addToBlacklist(this.input.value, this.props.currentUser.token);
                this.input.value = '';
              }
            }}>+</button>
          </span>
        </div>
        <div className="blacklist-container">
          {blacklistedSites}
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    blacklist : state.blacklist,
    currentUser : state.currentUser
})

let mapDispatchToProps = (dispatch) => ({
  blacklist_actions: bindActionCreators(BlacklistActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Blacklist);
