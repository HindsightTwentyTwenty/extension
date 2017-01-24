import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import BlacklistBar from '../Bars/BlacklistBar.js';
import * as BlacklistActions from '../../actions/Blacklist/BlacklistActions.js';

class Blacklist extends Component {

  constructor(props) {
    super(props);
  }

  fetchSites() {
    var blacklistedSites = this.props.blacklist.urls;
    return blacklistedSites.map(function(site) {
      return (<BlacklistBar key={site.pk} title={site.url}/>);
    });
  }

  render() {
    var blacklistedSites = this.fetchSites();
    return (
      <div>
        <div className="section-title">Blacklist</div>
        <div className="input-group category-entry">
          <input type="text" className="popup-form form-control" placeholder="Enter a site to be blacklisted. Must start with 'https://' or 'http://'"  ref={node => {
            this.input = node;
          }} />
          <span className="input-group-btn">
            <button className="btn add-category-btn" type="button" onClick={() => {
              var input = this.input.value.trim();
              if (input.substring(0, 8) == 'https://' || input.substring(0, 7) == 'http://') {
                console.log(this.input.value);
                this.props.blacklist_actions.addToBlacklist(this.input.value, this.props.currentUser.token);
                this.input.value = '';
              }
            }}>+</button>
          </span>
        </div>
        <div className="blacklist-container">
          <div className="section-title">Blacklisted Sites</div>
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
