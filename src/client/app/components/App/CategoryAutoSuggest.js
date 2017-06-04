import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import Select from 'react-select';


function getState () {
  return {
    searchable: true,
    selectValue: [],
    clearable: true,
  }
}

class CategoryAutoSuggest extends Component {

  constructor(props) {
    super(props);
    this.state = getState();
  }

  handleCategoryChange(newValue) {
    this.props.onSelect(newValue);
    this.setState({selectValue: newValue});
  }

  componentWillReceiveProps(nextProps){
    if(this.props.currentSearchCategories.searchCats != nextProps.currentSearchCategories.searchCats){
      var value = [];
      nextProps.currentSearchCategories.searchCats.forEach(
        function(searchCat){
          value.push(searchCat)});
      this.setState({selectValue: value});
    }
  }


	getCategoryOptions() {
    var options = [];

    Object.keys(this.props.categories.cats).map(function(pk) {
			var category = this.props.categories.cats[pk];
      options.push({ value: category.title, label: category.title })
    }, this);
    return options;
  }

  render() {
    return (
      <Select
        name="category-select"
        className="search-select-dropdown"
        value={this.state.selectValue}
        options={ this.getCategoryOptions() }
        onChange={ this.handleCategoryChange.bind(this)}
        noResultsText= ""
        placeholder="Type tag"
        multi={true}
      />
    )
  }

}

let mapStateToProps = (state) => ({
  currentSearchCategories : state.currentSearchCategories
})

let mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryAutoSuggest);
