import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import PageUrlBar from '../Bars/PageUrlBar.js';
import * as LookbackActions from '../../actions/App/LookbackActions.js';
import * as SearchConstants from '../../constants/SearchConstants.js'

function getState() {
  return {
    time_selection: SearchConstants.Anytime,
    category_selection: 0,
    sort_selection: SearchConstants.Relevance,
    iframe_show:false,
    iframehider_show:false
  }
}

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = getState();

    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
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
        return <PageUrlBar key={result.page.title} page={result.page} visit_pk={result.pk}/>
      });
    } else {
      return <div>LOADING</div>
    }
  }

  handleTimeChange(event) {
    this.setState({time_selection: event.target.value});
  }

  handleSortChange(event) {
    this.setState({sort_selection: event.target.value});
  }


  render() {
    return (
      <div>

        <div id="search-container">
          <div id="search-selection-container">
            <div className="container">
              <div className="row">
                <div className="col-xs-6 col-xs-offset-3">
                  <input type="text" className="advanced-search-bar" defaultValue={this.props.lookbackNav.searchTerm} placeholder="Search..." onKeyPress={this.searchBarInput.bind(this)} />
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div id="search-selection-container" className="col-xs-10 col-xs-offset-1">
                  <select id="time-selection" className="search-select-dropdown" value={this.state.time_selection} onChange={this.handleTimeChange}>
                    <option value={SearchConstants.Anytime}>Anytime</option>
                    <option value={SearchConstants.Hour}>Past hour</option>
                    <option value={SearchConstants.Day}>Past 24 hours</option>
                    <option value={SearchConstants.Week}>Past week</option>
                    <option value={SearchConstants.Month}>Past month</option>
                    <option value={SearchConstants.Year}>Past year</option>
                    <option value={SearchConstants.Custom}>Custom range...</option>
                  </select>
                  <select id="category-selection" name="category-selection" className="search-select-dropdown">
                    <option defaultValue="">Any Category</option>
                    { this.getCategories() }
                  </select>
                  <select id="sort-selection" className="search-select-dropdown" value={this.state.sort_selection} onChange={this.handleSortChange}>
                    <option value={SearchConstants.Relevance}>Sort by Relevance</option>
                    <option value={SearchConstants.Date}>Sort by Date</option>
                    <option value={SearchConstants.Time_Spent}>Sort by Time Spent</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div id="search-results-container">
            { this.searchResults() }
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  lookbackNav: state.lookbackNav,
  categories: state.categories,
  currentUser: state.currentUser,
  search: state.search
})


let mapDispatchToProps = (dispatch) => ({
  lookback_actions: bindActionCreators(LookbackActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);
