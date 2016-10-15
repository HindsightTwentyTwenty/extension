import React from 'react';
import {render} from 'react-dom';
import PopupActions from './actions/Popup/PopupActions.js';
import CategoryEntry from './CategoryEntry.js';


class PopupBody extends React.Component {
  constructor(props) {
    super(props);
  }


  getTabs(){
    this.props.
    this.props.tabActions
  }


  savePage() {
    this.props.addPage()
  }


  render () {
    return (
      <div>
        <p>categorize this page: </p>
        <br/>
        <hr/>
        <CategoryEntry/>
        <button onClick={this.savePage.bind(this)}>lookback</button>
        
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    pages : state.pages
  }
}

let mapDispatchToProps = () => {
  return {
    addPage : PopupActions.addPage
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tab);
//render(<Tab/>, document.getElementById('hindsite'));
