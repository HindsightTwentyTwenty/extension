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

  keyPressed(event){
    var keycode = event.keyCode || event.which;
    if(keycode == '13') {
        this.sendBlacklist();
    }
  }

  sendBlacklist(){
    var input = this.input.value.trim();
    if (input.substring(0, 8) == 'https://'){
      input = input.substring(8);
    } else if(input.substring(0, 7) == 'http://') {
      input = input.substring(7);
    }
    if(input != ''){
      this.props.blacklist_actions.addToBlacklist(input, this.props.currentUser.token);
      this.input.value = '';
      console.log("send");
    }


  }

  render() {
    var blacklistedSites = this.fetchSites();
    return (
      <div>
        <div className="section-title">Blacklisted Sites</div>
        <div className="input-group blacklist-entry">
           <span className="input-group-addon electric-blue">https://</span>
           <input type="text" className="form-control blacklist-text-entry" onKeyPress={this.keyPressed.bind(this)} placeholder="www.example.com" ref={node => {
             this.input = node;
           }}/>
          <span className="input-group-btn electric-blue">
            <button className="btn add-category-btn" type="button" onClick={() => {
              this.sendBlacklist();
            }}><i className="fa fa-plus" aria-hidden="true"></i></button>
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
