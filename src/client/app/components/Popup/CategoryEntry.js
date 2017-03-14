import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import * as GlobalConstants from '../../constants/GlobalConstants.js';
import * as PopupActions from '../../actions/Popup/PopupActions.js';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';

class CategoryEntry extends Component {
  constructor(props) {
    super(props);
  }

  addNewCategory(categoryTitle){
      this.props.category_actions.pushCategory(categoryTitle, this.props.categories.editCatColor.code, this.props.currentUser.token).then(() => {
        for (var key in this.props.categories.cats) {
          if (categoryTitle == this.props.categories.cats[key].title) {
            this.props.category_actions.toggleCategory(this.props.currentPage.url,
              this.props.categories.cats[key], true, this.props.currentUser.token, this.props.currentPage.title,);
            break;
          }
        }
    });
  }

  keyPressed(event){
    var keycode = event.keyCode || event.which;
    if(keycode == '13') {
      var inputValue = this.input.value.trim();
      if (inputValue !== '') {
        this.addNewCategory(inputValue);
        this.input.value = '';
      }
    }
  }

  getCurrentColor() {
    return <div className='color-square' key={this.props.categories.editCatColor.name}
    style={{"backgroundColor" : this.props.categories.editCatColor.code}}
    onClick={()=> this.props.category_actions.toggleColorPicker(!this.props.categories.showColorPicker)}></div>;
  }

  render () {
    return (
    <div className="create-category-bar">
      {this.getCurrentColor()}
      <div className="input-group popup-form-entry">
        <input type="text" className="popup-form form-control" placeholder="New Category..." onKeyPress={this.keyPressed.bind(this)} ref={node => {
          this.input = node;
        }} />
        <span className="input-group-btn">
          <button className="btn add-category-btn" type="button" onClick={() => {
            var inputValue = this.input.value.trim();
            if (inputValue !== '') {
              this.addNewCategory(inputValue);
              this.input.value = '';
            }
          }}><i className="fa fa-plus" aria-hidden="true"></i></button>
        </span>
      </div>
    </div>
    )
  }
}

let mapStateToProps = (state) => ({
    categories : state.categories,
    currentPage : state.currentPage,
    currentUser : state.currentUser
})

let mapDispatchToProps = (dispatch) => ({
    popup_actions: bindActionCreators(PopupActions, dispatch),
    category_actions: bindActionCreators(CategoryActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryEntry);
