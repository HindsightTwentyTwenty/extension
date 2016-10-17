import React from 'react';
import {render} from 'react-dom';
import PopupActions from './actions/Popup/PopupActions.js';

class CategoryEntry extends React.Component {

  addCategory() {

  }

  render () {
    return (
      <div>
        <input type="text" placeholder="other..."/>
        <button onClick={this.addCategory.bind(this)}>"+"</button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryEntry);
