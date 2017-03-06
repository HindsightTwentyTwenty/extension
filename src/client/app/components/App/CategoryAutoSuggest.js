import Autosuggest from 'react-autosuggest';
import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';
import * as AutoSuggestActions from '../../actions/App/AutoSuggestActions.js';

function getSuggestionValue(suggestion) {
  return suggestion.title;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.title}</span>
  );
}

class CategoryAutoSuggest extends Component {
  constructor(props) {
      super(props);
      this.props.category_actions.fetchCategories(this.props.currentUser.token);
  }
  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions(value){
    var inputValue = value.trim().toLowerCase();
    var inputLength = inputValue.length;
    var categories = this.props.categories.cats;
    return inputLength === 0 ? [] : categories.filter(cat =>
      cat.title.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  onChange(event, {newValue}){
    console.log(this.props.autosuggest_actions);
    this.props.autosuggest_actions.updateInputValue(newValue);
  }

  onSuggestionsFetchRequested({value}) {
    var updatedSuggestions = this.getSuggestions(value);
    this.props.autosuggest_actions.loadSuggestions(value, updatedSuggestions);
  }

  onSuggestionsClearRequested() {
    this.props.autosuggest_actions.clearSuggestions();
  }

  onSuggestionSelected(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }){
    console.log(suggestion);
    this.props.category_actions.toggleCategory(this.props.page.url, suggestion, true, this.props.currentUser.token);
    this.props.autosuggest_actions.clearSuggestions();
  }

  render() {
    var onChange = this.onChange.bind(this);
    var value = this.props.autoSuggest.value;
    var suggestions = this.props.autoSuggest.suggestions;
    var isLoading = this.props.autoSuggest.isLoading;
    const inputProps = {
      placeholder: "New Category",
      value,
      onChange
    };
    const status = (isLoading ? 'Loading...' : 'Type to load suggestions');

    return (
      <div>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
          onSuggestionSelected={this.onSuggestionSelected.bind(this)}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps} />
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  categories: state.categories,
  autoSuggest: state.autoSuggest,
  page: state.currentPage
})


let mapDispatchToProps = (dispatch) => {
  return {
      category_actions: bindActionCreators(CategoryActions, dispatch),
      autosuggest_actions: bindActionCreators(AutoSuggestActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryAutoSuggest);
