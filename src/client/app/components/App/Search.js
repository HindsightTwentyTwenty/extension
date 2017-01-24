import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import PageUrlBar from '../Bars/PageUrlBar.js';
import * as LookbackActions from '../../actions/App/LookbackActions.js';

class Search extends Component {

  constructor(props) {
    super(props);

    console.log("Search Results:", this.props.search);
    console.log("categories in Search", this.props.categories);
  }

  searchBarInput(event){
    var keycode = event.keyCode || event.which;
    if(keycode == '13') {
      var search_term = event.target.value;
      this.props.lookback_actions.searchTerm(search_term, this.props.currentUser.token);
    }
  }

  getCategories() {
    return this.props.categories.cats.map(function(category) {
      return <option key={category.title}> {category.title} </option>;
    });
  }

  searchResults(){
    if(this.props.search.results){
      return this.props.search.results.map(function(result) {
        return <PageUrlBar key={result.page.title} page={result.page}/>
      });
    } else {
      console.log("loading");
      return <div>LOADING</div>
    }

  }

  render() {
    return (
      <div id="search-container">
        <div id="search-selection-container">
          <div className="container">
            <div className="row">
              <div className="col-xs-6 col-xs-offset-3">
                <input type="text" className="advanced-search-bar" placeholder="Search..." onKeyPress={this.searchBarInput.bind(this)} />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div id="search-selection-container" className="col-xs-10 col-xs-offset-1">
                <select id="time-selection" name="time-selection" className="search-select-dropdown">
                  <option defaultValue="">Anytime</option>
                  <option>Past hour</option>
                  <option>Past 24 hours</option>
                  <option>Past week</option>
                  <option>Past month</option>
                  <option>Past year</option>
                  <option>Custom range...</option>
                </select>
                <select id="category-selection" name="category-selection" className="search-select-dropdown">
                  <option defaultValue="">Any Category</option>
                  { this.getCategories() }
                </select>
                <select id="sort-selection" name="sort-selection" className="search-select-dropdown">
                  <option defaultValue="">Sort by Relevance</option>
                  <option>Sort by Date</option>
                  <option>Sort by Time Spent</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div id="search-results-container">
          { this.searchResults() }
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  categories: state.categories,
  currentUser: state.currentUser,
  search: state.search
})


let mapDispatchToProps = (dispatch) => ({
  lookback_actions: bindActionCreators(LookbackActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);
