import React, { PropTypes, Component } from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import Select from 'react-select';


function getState () {
  return {
    searchable: true,
    selectValue: '',
    clearable: true,
  }
}

class CategoryAutoSuggest extends Component {

  constructor(props) {
    super(props);
    this.state = getState();
  }

  handleCategoryChange(newValue) {
    this.setState({
    			selectValue: newValue
    });
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
        placeholder="Add Category..."
      />
    )
  }

}

let mapStateToProps = (state) => ({

})

let mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryAutoSuggest);
